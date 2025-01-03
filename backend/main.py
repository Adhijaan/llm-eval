# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import experiments, test_cases, results

# Importing models to create tables
from models.user import User
from models.experiment import Experiment
from models.test_case import TestCase
from models.experiment_run import ExperimentRun
from models.test_case_result import TestCaseResult
from models.experiment_test_case import ExperimentTestCases

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:5173"],  # Allowing frontend
    allow_origins=["*"],  # Allowing all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(experiments.router, prefix="/api/experiments", tags=["experiments"])
app.include_router(test_cases.router, prefix="/api/test-cases", tags=["test-cases"])
app.include_router(results.router, prefix="/api/results", tags=["results"])

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
