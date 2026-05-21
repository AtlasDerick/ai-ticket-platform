import api from "./api";

export async function fetchTickets() {
  const response = await api.get("/tickets");
  return response.data;
}
