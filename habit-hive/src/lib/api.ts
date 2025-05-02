// lib/api.ts

const API_BASE = "https://habit-hive-server.onrender.com/api";

const defaultOptions: RequestInit = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

export async function getTodayHabits(userId: number) {
  const day = new Date().toLocaleDateString("en-US", { weekday: "short" });
  const res = await fetch(`${API_BASE}/habits/user/${userId}/today?day=${day}`, defaultOptions);
  console.log("Today’s habits:", await res.json());
  return res.json();
}

export async function toggleHabit({ id, is_active }: { id: number; is_active: boolean }) {
  const res = await fetch(`${API_BASE}/habits/${id}/toggle`, {
    ...defaultOptions,
    method: "PATCH",
    body: JSON.stringify({ is_active }),
  });
  return res.json();
}

export async function getHabits(userId: number) {
  const res = await fetch(`${API_BASE}/habits/user/${userId}`, defaultOptions);
  return res.json();
}

export async function getLogsByHabit(habitId: number) {
  const res = await fetch(`${API_BASE}/habitlogs/${habitId}`, defaultOptions);
  return res.json();
}

export async function getUserById(id: number) {
  const res = await fetch(`${API_BASE}/user/${id}`, defaultOptions);
  return res.json();
}

export async function updateUser({ id, ...data }: any) {
  const res = await fetch(`${API_BASE}/user/${id}`, {
    ...defaultOptions,
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
}
