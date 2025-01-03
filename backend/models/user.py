# models/user.py
from sqlalchemy import Column, Integer, Text
from sqlalchemy.orm import relationship
from config import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(Text)
    email = Column(Text, unique=True)
    # Relationships
    experiments = relationship("Experiment", back_populates="user")  
