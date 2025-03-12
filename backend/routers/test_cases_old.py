from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models.test_case import TestCase as TestCaseModel
from models.experiment import Experiment as ExperimentModel
from schemas.test_case import TestCaseCreate, TestCase

router = APIRouter()

# Create a new test case
@router.post("/", response_model=TestCase)
def create_test_case(
    test_case_data: TestCaseCreate,  
    db: Session = Depends(get_db)
):
    db_test_case = TestCaseModel(
        name=test_case_data.name,
        user_message=test_case_data.user_message,
        expected_output=test_case_data.expected_output
    )
    db.add(db_test_case)
    db.commit()
    db.refresh(db_test_case)


    try:
        experiment_ids = [experiment.id for experiment in test_case_data.experiments if experiment.id]
        experiments = db.query(ExperimentModel).filter(ExperimentModel.id.in_(experiment_ids)).all()
        if not experiments:
            raise Exception("No assosiated experiment Ids found")
        db_test_case.experiments.extend(experiments)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid experiment ID")
    
    return db_test_case

# Delete a test case by ID
@router.delete("/{test_case_id}/", response_model=TestCase)
def delete_test_case(
    test_case_id: int,
    db: Session = Depends(get_db)
):
    db_test_case = db.query(TestCaseModel).filter(TestCaseModel.id == test_case_id).first()
    if not db_test_case:
        raise HTTPException(status_code=404, detail="Test case not found")
    db.delete(db_test_case)
    db.commit()
    return db_test_case