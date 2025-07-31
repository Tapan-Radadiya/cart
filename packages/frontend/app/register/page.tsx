"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"}/api/auth/register`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        router.push("/login?success=1");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err: any) {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create your account</h1>
      {error && (
        <div
          className="mb-4 p-3 bg-red-100 text-red-700 rounded"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} aria-label="Register form">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
          />
        </div>
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
            autoComplete="new-password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring"
          aria-disabled={submitting}
          disabled={submitting}
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}