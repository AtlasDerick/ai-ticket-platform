from pydantic import BaseModel


class TicketSummaryRead(BaseModel):
    ticket_id: int
    summary: str
    model: str
