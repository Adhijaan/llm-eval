from sqlalchemy import Table, Column, Integer, ForeignKey
from config import Base

# Association Table for many-to-many relationship between Experiment and TestCase
ExperimentTestCases = Table(
    'experiment_test_cases', Base.metadata,
    Column('experiment_id', Integer, ForeignKey('experiments.id'), primary_key=True),
    Column('test_case_id', Integer, ForeignKey('testcases.id'), primary_key=True)
)
