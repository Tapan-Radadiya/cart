"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (result?.ok && !result.error) {
      router.push("/dashboard");
    } else {
      setError(
        result?.error ||
          "Sign-in failed. Please check your email and password and try again."
      );
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow p-8 rounded">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form className="space-y-4" onSubmit={handleSubmit} aria-describedby={error ? "login-error" : undefined}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            className="w-full border px-3 py-2 rounded"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-label="Email"
            aria-invalid={!!error}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            className="w-full border px-3 py-2 rounded"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            aria-label="Password"
            aria-invalid={!!error}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded font-semibold disabled:opacity-60"
          disabled={loading}
          aria-disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {error && (
          <div
            id="login-error"
            className="text-red-600 text-sm mt-2"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}