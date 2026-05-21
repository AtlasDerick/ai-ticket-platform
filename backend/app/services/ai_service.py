from openai import OpenAI, OpenAIError

from app.core.config import settings
from app.models.ticket import Ticket


class AIConfigurationError(Exception):
    pass


class AISummaryError(Exception):
    pass


def summarize_ticket_description(ticket: Ticket) -> str:
    if not settings.OPENAI_API_KEY:
        raise AIConfigurationError("OpenAI API key is not configured")

    if not ticket.description.strip():
        raise AISummaryError("Ticket description is empty")

    client = OpenAI(api_key=settings.OPENAI_API_KEY)

    try:
        response = client.responses.create(
            model=settings.OPENAI_MODEL,
            instructions=settings.AI_SUMMARY_PROMPT,
            input=(
                f"Ticket title: {ticket.title}\n"
                f"Category: {ticket.category}\n"
                f"Priority: {ticket.priority.value}\n"
                f"Status: {ticket.status.value}\n\n"
                f"Description:\n{ticket.description}"
            ),
            max_output_tokens=220,
        )
    except OpenAIError as exc:
        raise AISummaryError("OpenAI could not summarize this ticket") from exc

    summary = response.output_text.strip()

    if not summary:
        raise AISummaryError("OpenAI returned an empty summary")

    return summary
