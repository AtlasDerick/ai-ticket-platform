from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

from app.api.deps.auth import get_current_user
from app.api.deps.db import get_db
from app.models.user import User
from app.schemas.ticket import TicketCreate, TicketRead, TicketUpdate
from app.services import ticket_service

router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"],
)


def validate_assignee(db: Session, assigned_to: int | None) -> None:
    if assigned_to is not None and not ticket_service.user_exists(db, assigned_to):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Assigned user does not exist",
        )


def get_ticket_or_404(db: Session, ticket_id: int):
    ticket = ticket_service.get_ticket(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found",
        )

    return ticket


def ensure_ticket_owner(ticket, current_user: User) -> None:
    if ticket.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to modify this ticket",
        )


@router.post(
    "",
    response_model=TicketRead,
    status_code=status.HTTP_201_CREATED,
)
def create_ticket(
    ticket_data: TicketCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_assignee(db, ticket_data.assigned_to)

    return ticket_service.create_ticket(
        db=db,
        ticket_data=ticket_data,
        owner=current_user,
    )


@router.get("", response_model=list[TicketRead])
def get_tickets(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ticket_service.get_tickets(db=db, skip=skip, limit=limit)


@router.get("/{ticket_id}", response_model=TicketRead)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_ticket_or_404(db, ticket_id)


@router.put("/{ticket_id}", response_model=TicketRead)
def update_ticket(
    ticket_id: int,
    ticket_data: TicketUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not ticket_data.model_fields_set:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No ticket fields provided for update",
        )

    ticket = get_ticket_or_404(db, ticket_id)
    ensure_ticket_owner(ticket, current_user)

    if "assigned_to" in ticket_data.model_fields_set:
        validate_assignee(db, ticket_data.assigned_to)

    return ticket_service.update_ticket(
        db=db,
        ticket=ticket,
        ticket_data=ticket_data,
    )


@router.delete("/{ticket_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ticket = get_ticket_or_404(db, ticket_id)
    ensure_ticket_owner(ticket, current_user)
    ticket_service.delete_ticket(db=db, ticket=ticket)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
