# experiments.py
from fastapi import APIRouter, Depends, HTTPException
from config import get_supabase_client
from schemas.experiment import ExperimentCreate, Experiment
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
@router.post("/{experiment_id}/run")
def run_experiment(
    experiment_id: int,
    model: str,
    db=Depends(get_supabase_client)
):
    # Fetch the system prompt
    experiment_data = db.table('experiments') \
                        .select('system_prompt') \
                        .eq('id', experiment_id) \
                        .execute() \
                        .data
    if not experiment_data:
        return {"error": "Experiment not found"}
    system_prompt = experiment_data[0]['system_prompt']
    print(system_prompt)

    # Fetch associated test case IDs in one query
    associated_testcases = db.table('experimenttestcases') \
                             .select('test_case_id') \
                             .eq('experiment_id', experiment_id) \
                             .execute() \
                             .data
    test_case_ids = [tc['test_case_id'] for tc in associated_testcases]

    # Fetch user messages for all test cases in a single query
    user_messages_data = db.table('testcases') \
                           .select('user_message') \
                           .in_('id', test_case_ids) \
                           .execute() \
                           .data
    user_messages = [message['user_message'] for message in user_messages_data]
    
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
    
    experiment_result = [{user_message, get_response(user_message)} for user_message in user_messages]

    return experiment_result

