from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    assigned_tickets = relationship(
        "Ticket",
        back_populates="assignee",
        foreign_keys="Ticket.assigned_to",
        passive_deletes=True,
    )

    created_tickets = relationship(
        "Ticket",
        back_populates="owner",
        foreign_keys="Ticket.created_by",
        passive_deletes=True,
    )
