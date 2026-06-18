const API_URL = "http://127.0.0.1:8000";

export async function getStats() {
  const res = await fetch(`${API_URL}/stats`);
  return res.json();
}

export async function uploadEnergyCsv(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}