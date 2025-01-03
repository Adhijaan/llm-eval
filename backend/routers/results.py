# routers/test_case_result.py
from fastapi import APIRouter, Depends
from config import supabase_client
from schemas.test_case_result import TestCaseResult

router = APIRouter()

# Get all results
@router.get("/", response_model=list[TestCaseResult])
def get_results(db=Depends(supabase_client)):
    # Use Supabase's select method to fetch all rows from the "test_case_results" table
    response = db.table('test_case_results').select('*').execute()
    results = response.data
    return results