from pydantic import BaseModel

class ExperimentBase(BaseModel):
    name: str
    description: str

class ExperimentCreate(ExperimentBase):
    pass

class ExperimentResponse(ExperimentBase):
    id: int

    class Config:
        from_attributes = True
