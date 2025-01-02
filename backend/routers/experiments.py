from fastapi import APIRouter, HTTPException
from typing import List
from schemas.experiment import ExperimentCreate, ExperimentResponse
from models.experiment import Experiment

router = APIRouter()

@router.get("/", response_model=List[ExperimentResponse])
async def get_experiments():
    # Implementation here
    pass

@router.post("/", response_model=ExperimentResponse)
async def create_experiment(experiment: ExperimentCreate):
    # Implementation here
    pass

@router.delete("/{experiment_id}")
async def delete_experiment(experiment_id: int):
    # Implementation here
    pass

@router.get("/{experiment_id}/run")
async def run_experiment(experiment_id: int, model: str):
    # Implementation here
    pass
