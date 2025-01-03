from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models.experiment import Experiment as ExperimentModel
from schemas.experiment import ExperimentCreate, Experiment

router = APIRouter()

# Get all experiments
@router.get("/", response_model=list[Experiment])
def get_experiments(db: Session = Depends(get_db)):
    experiments = db.query(ExperimentModel).all()
    return experiments

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
@router.delete("/{experiment_id}", response_model=Experiment)
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

# Run an experiment
@router.get("/{experiment_id}/run")
def run_experiment(
    experiment_id: int,
    model: str,
    db: Session = Depends(get_db)
):
    # Placeholder logic for running an experiment
    # You can implement the actual logic here
    return {"experiment_id": experiment_id, "model": model, "status": "success"}