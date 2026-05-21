from enum import Enum

from sqlalchemy import Column, DateTime
from sqlalchemy import Enum as SQLEnum
from sqlalchemy import ForeignKey, Index, Integer, String, Text, func
from sqlalchemy.orm import relationship

from app.db.session import Base


class TicketPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    urgent = "urgent"


class TicketStatus(str, Enum):
    open = "open"
    in_progress = "in_progress"
    resolved = "resolved"
    closed = "closed"


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=False)
    priority = Column(
        SQLEnum(TicketPriority, name="ticket_priority"),
        nullable=False,
        default=TicketPriority.medium,
        index=True,
    )
    status = Column(
        SQLEnum(TicketStatus, name="ticket_status"),
        nullable=False,
        default=TicketStatus.open,
        index=True,
    )
    category = Column(String(100), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
    assigned_to = Column(
        Integer,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    created_by = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    assignee = relationship(
        "User",
        back_populates="assigned_tickets",
        foreign_keys=[assigned_to],
    )
    owner = relationship(
        "User",
        back_populates="created_tickets",
        foreign_keys=[created_by],
    )

    __table_args__ = (
        Index("ix_tickets_status_priority", "status", "priority"),
        Index("ix_tickets_assigned_status", "assigned_to", "status"),
        Index("ix_tickets_owner_status", "created_by", "status"),
    )
