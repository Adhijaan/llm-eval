# schemas/test_case.py
from __future__ import annotations
from pydantic import BaseModel
from typing import List

# Base schema for TestCase
class TestCaseBase(BaseModel):
    user_message: str
    expected_output: str

# Schema for creating a TestCase
class TestCaseCreate(TestCaseBase):
    pass

# Schema for returning a TestCase
class TestCase(TestCaseBase):
    id: int
    experiments: List["Experiment"] = []  # Include related Experiments
    test_case_results: List["TestCaseResult"] = []  # Include related TestCaseResults

    class Config:
        from_attributes = True  # Allows ORM mode for SQLAlchemy

# Resolve forward references
from schemas.experiment import Experiment
from schemas.test_case_result import TestCaseResult
# TestCase.model_rebuild()