from fastapi import APIRouter, HTTPException
from typing import List
from schemas.test_case_result import TestCaseResult, TestCaseResultCreate, TestCaseResultResponse

router = APIRouter()

# In-memory storage
results = []

@router.get("/", response_model=List[TestCaseResultResponse])
async def get_results():
    return results

@router.post("/", response_model=TestCaseResultResponse)
async def create_result(result: TestCaseResultCreate):
    new_result = {
        "id": len(results) + 1,
        **result.model_dump(),
    }
    results.append(new_result)
    return new_result