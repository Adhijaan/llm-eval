from datetime import datetime

class TestCaseResult:
    def __init__(self, id: int, test_case_id: int, model_output: str, model_name: str, timestamp: datetime):
        self.id = id
        self.test_case_id = test_case_id
        self.model_output = model_output
        self.model_name = model_name
        self.timestamp = timestamp
