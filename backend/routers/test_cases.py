# routers/test_case.py
from fastapi import APIRouter, Depends, HTTPException
from config import get_supabase_client
from schemas.test_case import TestCaseCreate, TestCase

router = APIRouter()

# Get test cases
@router.get("/", response_model=list[TestCase])
def get_test_cases(
    db=Depends(get_supabase_client)
):
    # Use Supabase's insert method to add a new row to the "test_cases" table
    response = db.table('testcases').select('*').execute()
    return response.data

# Create a new test case
@router.post("/", response_model=TestCase)
def create_test_case(
    test_case_data: TestCaseCreate,  # Use Pydantic schema for request validation
    db=Depends(get_supabase_client)
):
    # Use Supabase's insert method to add a new row to the "test_cases" table
    response = db.table('testcases').insert({
        "user_message": test_case_data.user_message,
        "expected_output": test_case_data.expected_output
    }).execute()
    db_test_case = response.data[0]  # Supabase returns the inserted row
    return db_test_case

# Delete a test case by ID
@router.delete("/{test_case_id}", response_model=TestCase)
def delete_test_case(
    test_case_id: int,
    db=Depends(get_supabase_client)
):
    # Use Supabase's delete method to remove a row from the "test_cases" table
    response = db.table('testcases').delete().eq('id', test_case_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Test case not found")
    db_test_case = response.data[0]  # Supabase returns the deleted row
    return db_test_case