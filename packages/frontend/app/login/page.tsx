"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
    setSubmitting(false);
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Log in to your account</h1>
      {success && (
        <div
          className="mb-4 p-3 bg-green-100 text-green-700 rounded"
          role="status"
          aria-live="polite"
        >
          Registration successful! Please log in.
        </div>
      )}
      {error && (
        <div
          className="mb-4 p-3 bg-red-100 text-red-700 rounded"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} aria-label="Login form">
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 px-4 rounded transition"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
          </form>
          <p className="mt-6 text-center text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-brand-700 hover:text-brand-700 font-semibold transition"
            >
              Register
            </Link>
          </p>
    </div>
  );
}