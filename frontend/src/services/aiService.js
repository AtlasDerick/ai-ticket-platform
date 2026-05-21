import api from "./api";

export async function summarizeTicket(ticketId) {
  const response = await api.post(`/ai/tickets/${ticketId}/summary`);
  return response.data;
}
