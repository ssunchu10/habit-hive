import axios from 'axios';
import type { LoginRequest, RegisterRequest, HabitRequest, HabitLogRequest } from './models';

const API_BASE_URL = 'https://habit-hive-server.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Cookie-based authentication - no need to manually set tokens
// The server handles authentication via HTTP-only cookies

// Auth APIs
export const register = (data: RegisterRequest) => api.post('/auth/register', data);
export const login = (data: LoginRequest) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// Habit APIs
export const createHabit = (data: HabitRequest) => api.post('/habits', data);
export const getHabitsByUser = (userId: string) => api.get(`/habits/user/${userId}`);
export const getHabitById = (id: string) => api.get(`/habits/${id}`);
export const updateHabit = (id: string, data: HabitRequest) => api.put(`/habits/${id}`, data);
export const deleteHabit = (id: string) => api.delete(`/habits/${id}`);
export const toggleHabitActive = (id: string, is_active: boolean) => api.patch(`/habits/${id}/toggle`, { is_active });

// Habit Log APIs
export const createHabitLog = (data: HabitLogRequest) => api.post('/habitlogs', data);
export const getHabitLogs = (habitId: string) => api.get(`/habitlogs/${habitId}`);
export const getHabitLogByDate = (habitId: string, date: string) => api.get(`/habitlogs/${habitId}/date`, { params: { date } });
export const updateHabitLog = (id: string, data: Partial<HabitLogRequest>) => api.put(`/habitlogs/${id}`, data);
export const deleteHabitLog = (id: string) => api.delete(`/habitlogs/${id}`);

export default api; 