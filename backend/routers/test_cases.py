from fastapi import APIRouter, HTTPException
from typing import List
from schemas.test_case import TestCaseCreate, TestCaseResponse

router = APIRouter()

@router.post("/", response_model=TestCaseResponse)
async def create_test_case(test_case: TestCaseCreate):
    # Implementation here
    pass

@router.delete("/{test_case_id}")
async def delete_test_case(test_case_id: int):
    # Implementation here
    pass
