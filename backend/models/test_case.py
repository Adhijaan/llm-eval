class TestCase:
    def __init__(self, id: int, prompt: str, expected_output: str, experiment_id: int):
        self.id = id
        self.prompt = prompt
        self.expected_output = expected_output
        self.experiment_id = experiment_id
