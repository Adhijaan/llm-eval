# schemas/experiment.py
from __future__ import annotations
from pydantic import BaseModel
from typing import List, Optional

# Base schema for Experiment
class ExperimentBase(BaseModel):
    name: str
    system_prompt: str
    user_id: int

# Schema for creating an Experiment
class ExperimentCreate(ExperimentBase):
    pass

# Schema for returning an Experiment
class Experiment(ExperimentBase):
    id: int
    test_cases: Optional[List["TestCase"]] = None  # Include related TestCases
    runs: Optional[List["ExperimentRun"]] = None   # Include related ExperimentRuns

    class Config:
        from_attributes = True  # Allows ORM mode for SQLAlchemy

# Resolve forward references
from schemas.test_case import TestCase
from schemas.experiment_run import ExperimentRun
# Experiment.model_rebuild()