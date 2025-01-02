from pydantic import BaseModel
from datetime import datetime

class TestCaseResultBase(BaseModel):
    test_case_id: int
    model_output: str
    model_name: str
    timestamp: datetime

class TestCaseResultCreate(TestCaseResultBase):
    pass

class TestCaseResultResponse(TestCaseResultBase):
    id: int

    class Config:
        from_attributes = True
