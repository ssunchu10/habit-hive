// app/profile/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUser } from "@/lib/hooks";
import { getUserById, updateUser } from "@/lib/api";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect } from "react";

export default function Profile() {
  const user = useUser();
  const { register, handleSubmit, reset } = useForm();

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => getUserById(user?.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (userDetails) reset(userDetails);
  }, [userDetails, reset]);

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => alert("Profile updated successfully"),
  });

  const onSubmit = (data: any) => {
    mutation.mutate({ id: user.id, ...data });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="First Name"
            {...register("first_name")}
            className="input"
          />
          <input
            placeholder="Last Name"
            {...register("last_name")}
            className="input"
          />
          <input
            placeholder="Email"
            type="email"
            {...register("email")}
            className="input"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </>
  );
}

// Assumes:
// getUserById(id: number)
// updateUser({ id, first_name, last_name, email })
