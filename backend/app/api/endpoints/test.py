from fastapi import APIRouter, HTTPException
from app.utils.supabase import supabase

router = APIRouter()

@router.get("/test-supabase")
def test_supabase():
    """
    Test route to check if Supabase is connected.
    """
    try:
        # Perform a simple query to check the connection
        response = supabase.table("users").select("*").limit(1).execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Supabase connection failed: {str(e)}")