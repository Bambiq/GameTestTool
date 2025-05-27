const API_URL = "https://laughing-space-winner-x5r6wqqx5rwjfrxw-8000.app.github.dev"; // lub odpowiedni adres

export async function fetchLogs() {
  const response = await fetch(`${API_URL}/logs`);
  if (!response.ok) throw new Error("Nie udało się pobrać logów");
  return await response.json();
}

export async function postLog(log) {
  const response = await fetch(`${API_URL}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  });
  if (!response.ok) throw new Error("Nie udało się wysłać loga");
  return await response.json();
}

export async function deleteLog(id) {
  const response = await fetch(`${API_URL}/logs/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Nie udało się usunąć loga");
}
