# routers/test_case_result.py
from fastapi import APIRouter, Depends
from config import get_supabase_client
from schemas.test_case_result import TestCaseResult

router = APIRouter()

# Get all results
@router.get("/", response_model=list[TestCaseResult])
def get_results(db=Depends(get_supabase_client)):
    # Use Supabase's select method to fetch all rows from the "testcaseresults" table
    response = db.table('testcaseresults').select('*').execute()
    results = response.data
    return results