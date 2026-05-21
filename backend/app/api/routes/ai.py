from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps.auth import get_current_user
from app.api.deps.db import get_db
from app.core.config import settings
from app.models.user import User
from app.schemas.ai import TicketSummaryRead
from app.services import ai_service, ticket_service

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post(
    "/tickets/{ticket_id}/summary",
    response_model=TicketSummaryRead,
)
def summarize_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ticket = ticket_service.get_ticket(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found",
        )

    try:
        summary = ai_service.summarize_ticket_description(ticket)
    except ai_service.AIConfigurationError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        ) from exc
    except ai_service.AISummaryError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(exc),
        ) from exc

    return {
        "ticket_id": ticket.id,
        "summary": summary,
        "model": settings.OPENAI_MODEL,
    }
