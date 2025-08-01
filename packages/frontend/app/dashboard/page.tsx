"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

type Project = { id: string; name: string };

export default function DashboardPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newProject, setNewProject] = useState("");
  const [creating, setCreating] = useState(false);

  // Fetch projects on mount
  useEffect(() => {
    if (!session?.accessToken) return;
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/api/projects`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      })
      .catch(() => setError("Could not load projects."))
      .finally(() => setLoading(false));
  }, [session?.accessToken]);

  // New project creation
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken || ""}`,
        },
        body: JSON.stringify({ name: newProject }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      const created = await res.json();
      setProjects((prev) => [created, ...prev]);
      setNewProject("");
    } catch {
      setError("Failed to create project.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto max-w-xl py-10">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          className="border px-2 py-1 rounded flex-1"
          placeholder="New project name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          disabled={creating}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded font-semibold"
          disabled={creating}
          type="submit"
        >
          {creating ? "Creating..." : "New project"}
        </button>
      </form>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">{error}</div>}
      {(!loading && projects.length === 0) && (
        <div className="text-gray-600 italic">No projects yet. Create your first!</div>
      )}
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="border rounded p-4 hover:bg-blue-50 transition">
            <Link href={`/dashboard/${p.id}`}>
              <span className="text-blue-700 font-semibold hover:underline">{p.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}