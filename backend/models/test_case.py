# models/test_case.py
from sqlalchemy import Column, Integer, Text
from sqlalchemy.orm import relationship
from config import Base

class TestCase(Base):
    __tablename__ = "testcases"
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    user_message = Column(Text, nullable=False)
    expected_output = Column(Text, nullable=False)
    # Relationships
    experiments = relationship("Experiment", secondary="experimenttestcases", back_populates="test_cases")
    test_case_results = relationship("TestCaseResult", back_populates="test_case") 