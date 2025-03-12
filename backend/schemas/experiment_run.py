# schemas/experiment_run.py
from __future__ import annotations
from pydantic import BaseModel
from typing import List
from datetime import datetime

# Base schema for ExperimentRun
class ExperimentRunBase(BaseModel):
    experiment_id: int
    # llm_model: str
    run_date: datetime

# Schema for creating an ExperimentRun
class ExperimentRunCreate(ExperimentRunBase):
    pass

# Schema for returning an ExperimentRun
class ExperimentRun(ExperimentRunBase):
    id: int
    experiment: "Experiment"  # Include related Experiment
    test_case_results: List["TestCaseResult"] = []  # Include related TestCaseResults

    class Config:
        from_attributes = True  # Allows ORM mode for SQLAlchemy

# Resolve forward references
from schemas.experiment import Experiment
from schemas.test_case_result import TestCaseResult
# Experiment.model_rebuild()