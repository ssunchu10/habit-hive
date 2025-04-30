"use client";

import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      const res = await fetch(
        "https://habit-hive-server.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
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

  const onSubmit = (data: LoginFormInputs) => {
    setErrorMessage("");
    mutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome Back</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className={styles.error}>{errors.email.message}</p>
        )}

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <button
          type="submit"
          className={styles.button}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>

      <p className={styles.redirectText}>
        Don’t have an account?{" "}
        <a href="/register" className={styles.link}>
          Sign Up
        </a>
      </p>
    </div>
  );
}
