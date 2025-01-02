from pydantic import BaseModel
from datetime import datetime

class TestCaseResult(BaseModel):
    test_case_id: int
    model_output: str
    model_name: str
    timestamp: datetime

class TestCaseResultCreate(TestCaseResult):
    pass

class TestCaseResultResponse(TestCaseResult):
    id: int

    class Config:
        from_attributes = True
