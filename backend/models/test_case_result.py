# models/test_case_result.py
from sqlalchemy import Column, Integer, Float, ForeignKey, Text, CheckConstraint
from sqlalchemy.orm import relationship
from config import Base

class TestCaseResult(Base):
    __tablename__ = "testcaseresults"
    id = Column(Integer, primary_key=True, index=True)
    experiment_run_id = Column(Integer, ForeignKey("experimentruns.id"))
    test_case_id = Column(Integer, ForeignKey("testcases.id"))
    llm_model = Column(Text)
    score = Column(Float, nullable=False)

    # Add a check constraint
    __table_args__ = (
        CheckConstraint("score >= 0 AND score <= 100", name="check_score_range"),
    )

    # Relationships
    experiment_run = relationship("ExperimentRun", back_populates="test_case_results")
    test_case = relationship("TestCase", back_populates="test_case_results")
