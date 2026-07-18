"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { registerUser } from "@/services/auth";
import { getApiErrorMessage } from "@/lib/api-error";

const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: RegisterFormValues) {
    try {
      setSubmitError("");

      await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      toast.success("Account created successfully. Please log in.");
      router.push("/login");
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, "Registration failed"));
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Register to access the RecruitAI dashboard.
        </p>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Username"
              {...form.register("username")}
              className="w-full rounded-lg border p-3"
            />
            {form.formState.errors.username ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.username.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <input
              type="email"
              placeholder="Email"
              {...form.register("email")}
              className="w-full rounded-lg border p-3"
            />
            {form.formState.errors.email ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <input
              type="password"
              placeholder="Password"
              {...form.register("password")}
              className="w-full rounded-lg border p-3"
            />
            {form.formState.errors.password ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.password.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <input
              type="password"
              placeholder="Confirm Password"
              {...form.register("confirmPassword")}
              className="w-full rounded-lg border p-3"
            />
            {form.formState.errors.confirmPassword ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          {submitError ? (
            <p className="rounded bg-red-100 p-3 text-sm text-red-600">
              {submitError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
