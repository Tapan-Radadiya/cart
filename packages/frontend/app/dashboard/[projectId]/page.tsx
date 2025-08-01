"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProjectNav from "components/ProjectNav";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

type Project = { id: string; name: string };

export default function ProjectOverviewPage({ params }: { params: { projectId: string } }) {
  const { data: session } = useSession();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/projects`, {
          headers: session?.accessToken
            ? { Authorization: `Bearer ${session.accessToken}` }
            : {},
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const projects: Project[] = await res.json();
        const found = projects.find((p) => p.id === params.projectId);
        setProject(found || null);
        if (!found) setError("Project not found.");
      } catch {
        setProject(null);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };
    if (session?.accessToken) fetchProjects();
  }, [params.projectId, session?.accessToken]);

  return (
    <div className="container max-w-xl mx-auto py-8">
      <ProjectNav projectId={params.projectId} active="overview" />
      <h1 className="text-2xl font-bold mb-4">Project Overview</h1>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="bg-red-100 text-red-700 px-3 py-2 mb-4 rounded">{error}</div>}
      {project && (
        <div className="bg-gray-50 p-5 rounded shadow">
          <div className="text-lg font-semibold mb-2">{project.name}</div>
          <div className="text-gray-500 text-sm">Project ID: {project.id}</div>
        </div>
      )}
    </div>
  );
}