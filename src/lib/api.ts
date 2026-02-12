const API_BASE = "/api";

export async function saveYesClick() {
  try {
    const res = await fetch(`${API_BASE}/clicks/yes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  } catch (error) {
    console.error("Failed to save yes click:", error);
  }
}

export async function saveNoClick() {
  try {
    const res = await fetch(`${API_BASE}/clicks/no`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  } catch (error) {
    console.error("Failed to save no click:", error);
  }
}

export async function saveQuizAnswers(answers: string[]) {
  try {
    const res = await fetch(`${API_BASE}/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    return res.json();
  } catch (error) {
    console.error("Failed to save quiz answers:", error);
  }
}

