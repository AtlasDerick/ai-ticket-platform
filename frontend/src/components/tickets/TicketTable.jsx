import { PriorityBadge, StatusBadge } from "./TicketBadges";

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function TicketTable({ onSummarizeTicket, summarizingTicketId, tickets }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-950">Recent tickets</h2>
        <p className="mt-1 text-sm text-slate-500">Prioritized customer issues from your backend queue.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ticket
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priority
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Assigned
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                AI
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {tickets.map((ticket) => (
              <tr className="hover:bg-slate-50" key={ticket.id}>
                <td className="max-w-sm px-5 py-4">
                  <p className="text-sm font-semibold text-slate-950">{ticket.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{ticket.description}</p>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-slate-700">{ticket.category}</td>
                <td className="px-5 py-4">
                  <PriorityBadge priority={ticket.priority} />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {ticket.assigned_to ? `User #${ticket.assigned_to}` : "Unassigned"}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{formatDate(ticket.created_at)}</td>
                <td className="px-5 py-4 text-right">
                  <button
                    className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-800 transition hover:border-cyan-300 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
                    type="button"
                    onClick={() => onSummarizeTicket(ticket)}
                    disabled={summarizingTicketId === ticket.id}
                  >
                    {summarizingTicketId === ticket.id ? "Summarizing..." : "Summarize"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketTable;
