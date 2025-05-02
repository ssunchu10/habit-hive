// app/create-habit/page.tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";
import type { ActionMeta } from "react-select";
import Select from "react-select";
import styles from "./CreateHabit.module.css";

interface HabitInput {
  title: string;
  description?: string;
  frequency: string;
  daysOfWeek?: string[];
  startDate: string;
  endDate?: string;
  is_active?: boolean;
  userId?: number;
}

type DayOption = { value: string; label: string };

const daysOptions = [
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
  { value: "Sun", label: "Sun" },
];

export default function CreateHabit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<HabitInput>();

  const selectedDays = watch("daysOfWeek") || [];
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: HabitInput) => {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...data,
          daysOfWeek:
            Array.isArray(data.daysOfWeek) && data.daysOfWeek.length
              ? data.daysOfWeek.join(",")
              : "Everyday",
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create habit");
      }
      return res.json();
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit = (data: HabitInput) => {
    setErrorMessage("");
    mutation.mutate(data);
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Create New Habit</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              placeholder="Title"
              {...register("title", { required: "Title is required" })}
              className={styles.input}
            />
            {errors.title && (
              <p className={styles.error}>{errors.title.message}</p>
            )}

            <textarea
              placeholder="Description (optional)"
              {...register("description")}
              className={styles.textarea}
            />

            <select
              {...register("frequency", { required: "Frequency is required" })}
              className={styles.input}
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            {errors.frequency && (
              <p className={styles.error}>{errors.frequency.message}</p>
            )}

            <Controller
              name="daysOfWeek"
              control={control}
              render={({ field }) => (
                <Select<DayOption, true>
                  {...field}
                  isMulti
                  options={daysOptions}
                  classNamePrefix="react-select"
                  className={styles.input}
                  onChange={(selected, _meta: ActionMeta<DayOption>) =>
                    field.onChange(selected.map((d) => d.value))
                  }
                  value={daysOptions.filter((d) =>
                    field.value?.includes(d.value)
                  )}
                />
              )}
            />

            <div className={styles.selectedDays}>
              {selectedDays.map((day) => (
                <span key={day} className={styles.selectedDay}>
                  {day}
                </span>
              ))}
            </div>

            <input
              type="date"
              placeholder="Start Date"
              {...register("startDate", { required: "Start date is required" })}
              className={styles.input}
            />
            {errors.startDate && (
              <p className={styles.error}>{errors.startDate.message}</p>
            )}

            <input
              type="date"
              placeholder="End Date (optional)"
              {...register("endDate")}
              className={styles.input}
            />

            <button type="submit" className={styles.button}>
              {mutation.isPending ? "Submitting..." : "Create Habit"}
            </button>

            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
