# models/test_case.py
from sqlalchemy import Column, Integer, Text
from sqlalchemy.orm import relationship
from config import Base

class TestCase(Base):
    __tablename__ = "testcases"
    id = Column(Integer, primary_key=True)
    user_message = Column(Text)
    expected_output = Column(Text)
    # Relationships
    experiments = relationship("Experiment", secondary="experiment_test_cases", back_populates="test_cases")
    test_case_results = relationship("TestCaseResult", back_populates="test_case") 