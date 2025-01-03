# schemas/experiment.py
from __future__ import annotations
from pydantic import BaseModel
from typing import List

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
    test_cases: List["TestCase"] = []  # Include related TestCases
    runs: List["ExperimentRun"] = []   # Include related ExperimentRuns

    class Config:
        from_attributes = True  # Allows ORM mode for SQLAlchemy

# Resolve forward references
from schemas.test_case import TestCase
from schemas.experiment_run import ExperimentRun
# Experiment.model_rebuild()