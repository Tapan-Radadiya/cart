"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Invalid email or password.");
    } else if (res?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="container mx-auto mt-12 bg-white shadow p-8 rounded max-w-md">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-semibold">
          Sign in
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}