# models/experiment_run.py
from sqlalchemy import Column, Integer, ForeignKey, Text, TIMESTAMP
from sqlalchemy.orm import relationship
from config import Base

class ExperimentRun(Base):
    __tablename__ = "experimentruns"
    id = Column(Integer, primary_key=True, index=True)
    experiment_id = Column(Integer, ForeignKey("experiments.id"), nullable=False)
    # llm_model = Column(Text)
    run_date = Column(TIMESTAMP, nullable=False)
    
    # Relationships
    experiment = relationship("Experiment", back_populates="runs")
    test_case_results = relationship("TestCaseResult", back_populates="experiment_run")
