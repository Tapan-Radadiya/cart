"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: Hook up NextAuth (Credentials) to backend /auth/login
  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow p-8 rounded">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-semibold">
          Sign in
        </button>
      </form>
    </div>
  );
}