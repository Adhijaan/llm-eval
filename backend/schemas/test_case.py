from pydantic import BaseModel

class TestCaseBase(BaseModel):
    prompt: str
    expected_output: str
    experiment_id: int

class TestCaseCreate(TestCaseBase):
    pass

class TestCaseResponse(TestCaseBase):
    id: int

    class Config:
        from_attributes = True
