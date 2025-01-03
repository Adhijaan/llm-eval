# schemas/test_case_result.py
from __future__ import annotations
from pydantic import BaseModel, Field

# Base schema for TestCaseResult
class TestCaseResultBase(BaseModel):
    experiment_run_id: int
    test_case_id: int
    llm_model: str
    score : float = Field(ge=0, le=100)

# Schema for creating a TestCaseResult
class TestCaseResultCreate(TestCaseResultBase):
    pass

# Schema for returning a TestCaseResult
class TestCaseResult(TestCaseResultBase):
    id: int
    experiment_run: "ExperimentRun"  # Include related ExperimentRun
    test_case: "TestCase"  # Include related TestCase

    class Config:
        from_attributes = True  # Allows ORM mode for SQLAlchemy

# Resolve forward references
from schemas.experiment_run import ExperimentRun
from schemas.test_case import TestCase
# TestCaseResult.model_rebuild()
