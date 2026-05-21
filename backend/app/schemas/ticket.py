from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.ticket import TicketPriority, TicketStatus


class TicketBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    priority: TicketPriority = TicketPriority.medium
    status: TicketStatus = TicketStatus.open
    category: str = Field(..., min_length=1, max_length=100)
    assigned_to: int | None = None


class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, min_length=1)
    priority: TicketPriority | None = None
    status: TicketStatus | None = None
    category: str | None = Field(default=None, min_length=1, max_length=100)
    assigned_to: int | None = None


class TicketRead(TicketBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_by: int
    created_at: datetime
    updated_at: datetime
