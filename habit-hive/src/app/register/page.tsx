"use client";

import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type SignUpFormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

type SignUpRequest = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<SignUpFormInputs>();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: SignUpRequest) => {
      console.log(data);
      const res = await fetch(
        "https://habit-hive-server.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to register");
      }
      return res.json();
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  const validateStepAndNext = async () => {
    if (step === 1) {
      const valid = await trigger(["first_name", "last_name"]);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await trigger("email");
      if (valid) setStep(3);
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = (data: SignUpFormInputs) => {
    setErrorMessage("");
    const { confirm_password, ...rest } = data;
    mutation.mutate(rest as SignUpRequest);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {(step === 2 || step === 3) && (
          <button type="button" onClick={goBack} className={styles.backButton}>
            <ArrowLeft size={20} />
          </button>
        )}

        {step === 1 && (
          <>
            <input
              className={styles.input}
              placeholder="First Name"
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && (
              <p className={styles.error}>{errors.first_name.message}</p>
            )}

            <input
              className={styles.input}
              placeholder="Last Name"
              {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && (
              <p className={styles.error}>{errors.last_name.message}</p>
            )}

            <button
              type="button"
              onClick={validateStepAndNext}
              className={styles.button}
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className={styles.input}
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}

            <button
              type="button"
              onClick={validateStepAndNext}
              className={styles.button}
            >
              Continue
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              className={styles.input}
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}

            <input
              className={styles.input}
              placeholder="Confirm Password"
              type="password"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
            {errors.confirm_password && (
              <p className={styles.error}>{errors.confirm_password.message}</p>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Sign Up"}
            </button>
          </>
        )}

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
      <p className={styles.redirectText}>
        Already have an account?{" "}
        <a href="/login" className={styles.link}>
          Login
        </a>
      </p>
    </div>
  );
}
