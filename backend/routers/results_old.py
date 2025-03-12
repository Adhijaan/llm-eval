from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session  
from db import get_db
from models.test_case_result import TestCaseResult as TestCaseResultModel
from schemas.test_case_result import TestCaseResult


router = APIRouter()

# Get all results
@router.get("/", response_model=list[TestCaseResult])
def get_results(db: Session = Depends(get_db)):
    print("Fetching results")
    results = db.query(TestCaseResultModel).all()
    for x in range(0,4):
        print(results[x].__dict__)
    # print(results)

    raise Exception("working in progress")
    return results