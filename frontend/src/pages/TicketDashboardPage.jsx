import { useEffect, useMemo, useState } from "react";

import TicketSummaryCard from "../components/ai/TicketSummaryCard";
import KpiCard from "../components/dashboard/KpiCard";
import TicketTable from "../components/tickets/TicketTable";
import { TicketsEmptyState, TicketsErrorState, TicketsLoadingState } from "../components/tickets/TicketStates";
import DashboardLayout from "../layouts/DashboardLayout";
import { summarizeTicket } from "../services/aiService";
import { fetchTickets } from "../services/ticketService";

function countBy(tickets, field, value) {
  return tickets.filter((ticket) => ticket[field] === value).length;
}

function TicketDashboardPage({ onLogout }) {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);
  const [summaryError, setSummaryError] = useState("");
  const [summaryTicket, setSummaryTicket] = useState(null);
  const [summarizingTicketId, setSummarizingTicketId] = useState(null);

  const loadTickets = async ({ showLoading = true } = {}) => {
    setError("");

    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const ticketData = await fetchTickets();
      setTickets(ticketData);
    } catch (ticketsError) {
      if (ticketsError.response?.status === 401) {
        onLogout();
        return;
      }

      const message =
        ticketsError.response?.data?.detail ||
        ticketsError.message ||
        "Please check your session and backend connection.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarizeTicket = async (ticket) => {
    setSummary(null);
    setSummaryError("");
    setSummaryTicket(ticket);
    setSummarizingTicketId(ticket.id);

    try {
      const summaryData = await summarizeTicket(ticket.id);
      setSummary(summaryData);
    } catch (summaryRequestError) {
      if (summaryRequestError.response?.status === 401) {
        onLogout();
        return;
      }

      const message =
        summaryRequestError.response?.data?.detail ||
        summaryRequestError.message ||
        "Unable to summarize this ticket.";

      setSummaryError(message);
    } finally {
      setSummarizingTicketId(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchTickets()
      .then((ticketData) => {
        if (isMounted) {
          setTickets(ticketData);
          setError("");
        }
      })
      .catch((ticketsError) => {
        if (isMounted) {
          if (ticketsError.response?.status === 401) {
            onLogout();
            return;
          }

          const message =
            ticketsError.response?.data?.detail ||
            ticketsError.message ||
            "Please check your session and backend connection.";

          setError(message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [onLogout]);

  const kpis = useMemo(
    () => [
      {
        label: "Total tickets",
        value: tickets.length,
        helper: "All",
        tone: "slate",
      },
      {
        label: "Open tickets",
        value: countBy(tickets, "status", "open"),
        helper: "Active",
        tone: "cyan",
      },
      {
        label: "In progress",
        value: countBy(tickets, "status", "in_progress"),
        helper: "Working",
        tone: "amber",
      },
      {
        label: "Urgent priority",
        value: countBy(tickets, "priority", "urgent"),
        helper: "Escalate",
        tone: "red",
      },
    ],
    [tickets],
  );

  return (
    <DashboardLayout onLogout={onLogout}>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </section>

      <section className="mt-6">
        <TicketSummaryCard
          error={summaryError}
          isLoading={Boolean(summarizingTicketId)}
          summary={summary}
          ticketTitle={summaryTicket?.title}
        />

        {isLoading && <TicketsLoadingState />}
        {!isLoading && error && <TicketsErrorState message={error} onRetry={() => loadTickets()} />}
        {!isLoading && !error && tickets.length === 0 && <TicketsEmptyState />}
        {!isLoading && !error && tickets.length > 0 && (
          <TicketTable
            onSummarizeTicket={handleSummarizeTicket}
            summarizingTicketId={summarizingTicketId}
            tickets={tickets}
          />
        )}
      </section>
    </DashboardLayout>
  );
}

export default TicketDashboardPage;
