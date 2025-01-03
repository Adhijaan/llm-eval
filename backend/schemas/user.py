# schemas/user.py
from __future__ import annotations
from pydantic import BaseModel
from typing import List

# Base schema for User
class UserBase(BaseModel):
    name: str
    email: str

# Schema for creating a User
class UserCreate(UserBase):
    pass

# Schema for returning a User
class User(UserBase):
    id: int
    experiments: List["Experiment"] = []  # Include related Experiments

    class Config:
        from_attributes = True  # Allows ORM mode for SQLAlchemy

# Resolve forward references
from schemas.experiment import Experiment
# User.model_rebuild()