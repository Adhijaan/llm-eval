from fastapi import APIRouter
from models.test_case_result import TestCaseResult
from schemas.test_case_result import TestCaseResult as TestCaseResultSchema

router = APIRouter()

# In-memory storage for results
results_db = []

@router.get("/")
def get_results():
    return results_db