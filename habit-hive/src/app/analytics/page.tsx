// app/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar/Navbar";
import { useUser } from "@/lib/hooks";
import { getHabits, getLogsByHabit } from "@/lib/api";

export default function Analytics() {
  const user = useUser();
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);

  const { data: habits = [] } = useQuery({
    queryKey: ["habits", user?.id],
    queryFn: () => getHabits(user?.id),
    enabled: !!user?.id,
  });

  const { data: logs = [] } = useQuery({
    queryKey: ["habitLogs", selectedHabitId],
    queryFn: () => getLogsByHabit(selectedHabitId!),
    enabled: !!selectedHabitId,
  });

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Analytics</h1>

        <select
          onChange={(e) => setSelectedHabitId(Number(e.target.value))}
          className="border rounded p-2 mb-4"
        >
          <option value="">Select a habit</option>
          {habits.map((habit: any) => (
            <option key={habit.id} value={habit.id}>
              {habit.title}
            </option>
          ))}
        </select>

        {logs.length > 0 ? (
          <div className="space-y-2">
            {logs.map((log: any) => (
              <div key={log.id} className="border p-2 rounded">
                <p>
                  <strong>Date:</strong> {log.date}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {log.completed ? "Completed" : "Missed"}
                </p>
                {log.note && (
                  <p>
                    <strong>Note:</strong> {log.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          selectedHabitId && <p>No logs found for this habit.</p>
        )}
      </div>
    </>
  );
}

// Assumes the following functions exist in /lib/api.ts:
// getHabits(userId: number)
// getLogsByHabit(habitId: number)
