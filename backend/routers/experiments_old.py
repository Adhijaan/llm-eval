import logging 
import os
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from pydantic import model_validator, BaseModel
from groq import Groq
from dotenv import load_dotenv
from models.experiment import Experiment as ExperimentModel
from models.test_case import TestCase as TestCaseModel
from models.experiment_run import ExperimentRun as ExperimentRunModel
from models.test_case_result import TestCaseResult as TestCaseResultModel
from schemas.experiment import ExperimentCreate, Experiment, ExperimentRun
from db import get_db
router = APIRouter()

load_dotenv()
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

logging.basicConfig(level=logging.INFO)


# Get all experiments
@router.get("/", response_model=list[Experiment])
def get_experiments(db: Session = Depends(get_db)):
    try:
        experiments = db.query(ExperimentModel).all()
        # Serialize the ORM objects to dictionaries
        experiment_dicts = [
            {key: value for key, value in experiment.__dict__.items() if key != "_sa_instance_state"}
            for experiment in experiments
        ]
        experiment_data = [Experiment.model_validate(experiment).model_dump(exclude={"test_cases", "runs"}) for experiment in experiment_dicts]
        return experiment_data
    except Exception as e:
        # Log the error and raise an HTTPException
        print(f"Error fetching experiments: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Create a new experiment
@router.post("/", response_model=Experiment)
def create_experiment(
    experiment_data: ExperimentCreate,  # Use Pydantic schema for request validation
    db: Session = Depends(get_db)
):
    db_experiment = ExperimentModel(
        name=experiment_data.name,
        system_prompt=experiment_data.system_prompt,
        user_id=experiment_data.user_id
    )
    db.add(db_experiment)
    db.commit()
    db.refresh(db_experiment)
    return db_experiment

# Delete an experiment by ID
@router.delete("/{experiment_id}/", response_model=Experiment)
def delete_experiment(
    experiment_id: int,
    db: Session = Depends(get_db)
):
    db_experiment = db.query(ExperimentModel).filter(ExperimentModel.id == experiment_id).first()
    if not db_experiment:
        raise HTTPException(status_code=404, detail="Experiment not found")
    db.delete(db_experiment)
    db.commit()
    return db_experiment


class ExperimentRunRequest(BaseModel):
    model: str

# Run an experiment Todo
@router.post("/{experiment_id}/run/")
def run_experiment(
    experiment_id: int,
    request: ExperimentRunRequest,
    db: Session = Depends(get_db)
):
    model = request.model
    logging.info(f"Running experiment {experiment_id} with model {model}")
    # Placeholder logic for running an experiment

    # Fetch the system prompt
    experiment = db.get(ExperimentModel, experiment_id)
    if not experiment:
        raise HTTPException(status_code=404, detail="Experiment not found")
    system_prompt = experiment.system_prompt

    # Fetch associated test case IDs
    associated_test_cases = experiment.test_cases
    
    # Run the experiment
    # Create an experiment run object
    experiment_run = ExperimentRunModel(
        experiment_id=experiment_id,
        run_date=datetime.now()
    )
    db.add(experiment_run)
    db.commit()
    db.refresh(experiment_run)
    experiment_results = []
    test_case_results = []
    # Run the experiment for each test case
    for test_case in associated_test_cases:
        try:
            user_message = test_case.user_message
            llm_response = get_llm_response(user_message, system_prompt, model)
            logging.info(f"LLM response: {llm_response}")
            experiment_results.append({
                "user_prompt": user_message,
                "response": llm_response
            })
        except Exception as e:
            logging.error(f"Error running experiment: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")
        # Create a test case result object
        test_case_result = TestCaseResultModel(
            test_case_id=test_case.id,
            experiment_run_id=experiment_run.id,
            llm_model=model,
            score=0 # TODO: Add scoring logic
        )
        test_case_results.append(test_case_result)

    # Bulk insert into testcaseresults
    db.bulk_save_objects(test_case_results)
    db.commit()

    return experiment_results


def get_llm_response(user_prompt, system_prompt, model):
    try:
        chat_completion = groq_client.chat.completions.create(
            messages =
            [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model=model,
            temperature=0.5,
            max_tokens=1000
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        logging.error(f"Error getting LLM response: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")