// User model
export interface User {
  id: string; // or number, depending on backend
  first_name: string;
  last_name: string;
  email: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Habit model
export interface Habit {
  id: string; // or number
  title: string;
  description: string;
  frequency: string; // e.g., 'Weekly'
  daysOfWeek: string; // e.g., 'Mon,Wed,Fri'
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  is_active: boolean;
  userId: string; // or number, if returned by backend
}

export interface HabitRequest {
  title: string;
  description: string;
  frequency: string;
  daysOfWeek: string;
  startDate: string;
  endDate: string;
}

// Habit Log model
export interface HabitLog {
  id: string; // or number
  habitId: string; // or number
  date: string; // ISO date string
  completed: boolean;
  note?: string;
}

export interface HabitLogRequest {
  habitId: string; // or number
  date: string;
  completed: boolean;
  note?: string;
} 