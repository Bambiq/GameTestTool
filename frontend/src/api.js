const API_URL = "https://laughing-space-winner-x5r6wqqx5rwjfrxw-8000.app.github.dev";

export async function fetchLogs() {
  const response = await fetch(`${API_URL}/logs`);
  if (!response.ok) throw new Error("Błąd pobierania logów");
  return response.json();
}

export async function postLog(log) {
  const response = await fetch(`${API_URL}/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(log),
  });
  if (!response.ok) throw new Error("Błąd wysyłania logu");
  return response.json();
}