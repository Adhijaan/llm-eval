from fastapi import APIRouter
from app.api.endpoints import test

api_router = APIRouter()
api_router.include_router(test.router)

# @api_router.get("/items")
# async def get_items():
#     return {"message": "Items"}