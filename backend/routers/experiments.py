# experiments.py
from fastapi import APIRouter, Depends, HTTPException
from config import get_supabase_client
from schemas.experiment import ExperimentCreate, Experiment
from pydantic import BaseModel
from datetime import datetime
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))


router = APIRouter()

# Get all experiments
@router.get("/", response_model=list[Experiment])
def get_experiments(db=Depends(get_supabase_client)):
    response = db.table('experiments').select('*').execute()
    experiments = response.data
    return experiments

# Create a new experiment
@router.post("/", response_model=Experiment)
def create_experiment(
    experiment_data: ExperimentCreate,  # Use Pydantic schema for request validation
    db=Depends(get_supabase_client)
):
    response = db.table('experiments').insert({
        "name": experiment_data.name,
        "system_prompt": experiment_data.system_prompt,
        "user_id": experiment_data.user_id
    }).execute()
    db_experiment = response.data[0]
    return db_experiment

# Delete an experiment by ID
@router.delete("/{experiment_id}", response_model=Experiment)
def delete_experiment(
    experiment_id: int,
    db=Depends(get_supabase_client)
):
    response = db.table('experiments').delete().eq('id', experiment_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Experiment not found")
    db_experiment = response.data[0]
    return db_experiment

# Run an experiment
class RunExperimentRequest(BaseModel):
    model: str

@router.post("/{experiment_id}/run")
def run_experiment(
    experiment_id: int,
    request: RunExperimentRequest,  # Accept the request body
    db=Depends(get_supabase_client)
):
    model = request.model

    # Fetch the system prompt
    experiment_data = db.table('experiments') \
                        .select('system_prompt') \
                        .eq('id', experiment_id) \
                        .execute() \
                        .data
    if not experiment_data:
        return {"error": "Experiment not found"}
    system_prompt = experiment_data[0]['system_prompt']

    # Fetch associated test case IDs
    associated_testcases = db.table('experimenttestcases') \
                             .select('test_case_id') \
                             .eq('experiment_id', experiment_id) \
                             .execute() \
                             .data
    test_case_ids = [tc['test_case_id'] for tc in associated_testcases]

    # Fetch user messages for all test cases
    user_messages_data = db.table('testcases') \
                           .select('id', 'user_message') \
                           .in_('id', test_case_ids) \
                           .execute() \
                           .data
    user_messages = {message['id']: message['user_message'] for message in user_messages_data}

    # Returns response from groq call to LLM
    def get_response(user_prompt):
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model=model,
            temperature=0.5
        )
        return chat_completion.choices[0].message.content

    # Create a new experiment run
    run_date = datetime.now()
    experiment_run_data = {
        "experiment_id": experiment_id,
        "llm_model": model,
        "run_date": run_date.isoformat()
    }
    experiment_run = db.table('experimentruns').insert(experiment_run_data).execute()
    experiment_run_id = experiment_run.data[0]['id']

    # Run the experiment and store results
    experiment_results = []
    test_case_results = []
    for test_case_id, user_message in user_messages.items():
        response = get_response(user_message)
        experiment_results.append({"user_prompt": user_message, "response": response})
        
        test_case_results.append({
            "experiment_run_id": experiment_run_id,
            "test_case_id": test_case_id,
            "llm_model": model,
            "score": None  # Add logic here to calculate score if needed
        })

    # Bulk insert into testcaseresults
    db.table('testcaseresults').insert(test_case_results).execute()

    # Return the experiment results
    return experiment_results
