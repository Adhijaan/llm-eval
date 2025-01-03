# models/experiment.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from config import Base

class Experiment(Base):
    __tablename__ = "experiments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    system_prompt = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))
    # Relationships 
    user = relationship("User", back_populates="experiments")
    test_cases = relationship("TestCase", secondary="experiment_test_cases", back_populates="experiments")
    runs = relationship("ExperimentRun", back_populates="experiment")