// app/dashboard/page.tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodayHabits, toggleHabit } from "@/lib/api";
import { useUser } from "@/lib/hooks";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./Dashboard.module.css";

interface Habit {
  id: number;
  title: string;
  description: string;
  frequency: string;
  daysOfWeek: string;
  startDate: string;
  endDate?: string;
  is_active: boolean;
}

export default function Dashboard() {
  const user = useUser();
  const queryClient = useQueryClient();

  const { data: habitsData, isLoading } = useQuery({
    queryKey: ["todayHabits", user?.id],
    queryFn: () => getTodayHabits(user?.id),
    enabled: !!user?.id,
  });

  const mutation = useMutation({
    mutationFn: toggleHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todayHabits", user?.id] }),
  });

  const habits: Habit[] = habitsData?.habits || [];
  const total = habits.length;
  const active = habits.filter((h) => h.is_active).length;
  const inactive = total - active;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Habit Overview</h1>

        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <p className={styles.statNumber}>{total}</p>
            <p className={styles.statLabel}>Total Habits</p>
          </div>
          <div className={styles.statBox}>
            <p className={styles.statNumber}>{active}</p>
            <p className={styles.statLabel}>Active</p>
          </div>
          <div className={styles.statBox}>
            <p className={styles.statNumber}>{inactive}</p>
            <p className={styles.statLabel}>Inactive</p>
          </div>
        </div>

        <div className={styles.grid}>
          {habits.map((habit: Habit) => (
            <div key={habit.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{habit.title}</h2>
                <span
                  className={habit.is_active ? styles.badgeActive : styles.badgeInactive}
                >
                  {habit.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className={styles.cardDesc}>{habit.description}</p>
              <p className={styles.meta}>📅 {habit.frequency}</p>
              <p className={styles.meta}>📆 {habit.daysOfWeek}</p>
              <div className={styles.actions}>
                <button
                  className={styles.toggleBtn}
                  onClick={() => mutation.mutate({ id: habit.id, is_active: !habit.is_active })}
                >
                  {habit.is_active ? "Mark Inactive" : "Mark Active"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
