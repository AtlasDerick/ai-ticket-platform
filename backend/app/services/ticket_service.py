from sqlalchemy.orm import Session

from app.models.ticket import Ticket
from app.models.user import User
from app.schemas.ticket import TicketCreate, TicketUpdate


def get_ticket(db: Session, ticket_id: int) -> Ticket | None:
    return db.query(Ticket).filter(Ticket.id == ticket_id).first()


def get_tickets(db: Session, skip: int = 0, limit: int = 100) -> list[Ticket]:
    return (
        db.query(Ticket)
        .order_by(Ticket.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def user_exists(db: Session, user_id: int) -> bool:
    return db.query(User.id).filter(User.id == user_id).first() is not None


def create_ticket(
    db: Session,
    ticket_data: TicketCreate,
    owner: User,
) -> Ticket:
    db_ticket = Ticket(
        **ticket_data.model_dump(),
        created_by=owner.id,
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket


def update_ticket(
    db: Session,
    ticket: Ticket,
    ticket_data: TicketUpdate,
) -> Ticket:
    update_data = ticket_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(ticket, field, value)

    db.commit()
    db.refresh(ticket)

    return ticket


def delete_ticket(db: Session, ticket: Ticket) -> None:
    db.delete(ticket)
    db.commit()
