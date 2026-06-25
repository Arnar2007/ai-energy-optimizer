const API_URL = "http://127.0.0.1:8000";

export async function getStats() {
  const res = await fetch(`${API_URL}/stats`);
  return res.json();
}

export async function uploadEnergyCsv(file, userId) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);
  
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
  
    return res.json();
  }
  export async function getUserData(userId) {
    const res = await fetch(`${API_URL}/user-data/${userId}`);
    return res.json();
  }
  export async function getUploads(userId) {
    const res = await fetch(`${API_URL}/uploads/${userId}`);
    return res.json();
  }