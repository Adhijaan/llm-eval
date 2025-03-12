# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import experiments_old, test_cases_old, results_old

# Importing models to create tables
from models.user import User
from models.experiment import Experiment
from models.test_case import TestCase
from models.experiment_run import ExperimentRun
from models.test_case_result import TestCaseResult
from models.experiment_test_case import ExperimentTestCases

app = FastAPI(
    title="LLM Eval Docs",
    redirect_slashes=False
)

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:5173"],  # Allowing frontend
    allow_origins=["*"],  # Allowing all temporary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(experiments_old.router, prefix="/api/experiments", tags=["experiments"])
app.include_router(test_cases_old.router, prefix="/api/test-cases", tags=["test-cases"])
app.include_router(results_old.router, prefix="/api/results", tags=["results"])

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
