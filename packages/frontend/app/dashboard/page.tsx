"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  // TODO: fetch projects for user
  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      <ul className="space-y-2">
        <li className="border rounded p-4">Project Alpha (placeholder)</li>
        <li className="border rounded p-4">Project Beta (placeholder)</li>
      </ul>
    </div>
  );
}