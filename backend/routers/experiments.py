# experiments.py
from fastapi import APIRouter, Depends, HTTPException
from config import supabase_client
from schemas.experiment import ExperimentCreate, Experiment

router = APIRouter()

# Get all experiments
@router.get("/", response_model=list[Experiment])
def get_experiments(db=Depends(supabase_client)):
    response = db.table('experiments').select('*').execute()
    experiments = response.data
    return experiments

# Create a new experiment
@router.post("/", response_model=Experiment)
def create_experiment(
    experiment_data: ExperimentCreate,  # Use Pydantic schema for request validation
    db=Depends(supabase_client)
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
    db=Depends(supabase_client)
):
    response = db.table('experiments').delete().eq('id', experiment_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Experiment not found")
    db_experiment = response.data[0]
    return db_experiment

# Run an experiment
@router.get("/{experiment_id}/run")
def run_experiment(
    experiment_id: int,
    model: str,
    db=Depends(supabase_client)
):
    # Placeholder logic for running an experiment
    return {"experiment_id": experiment_id, "model": model, "status": "success"}
