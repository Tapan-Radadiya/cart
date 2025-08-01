"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProjectNav from "components/ProjectNav";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export default function DocsPage({ params }: { params: { projectId: string } }) {
  const { data: session } = useSession();
  const [docs, setDocs] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_URL}/api/projects/${params.projectId}/docs`,
          {
            headers: session?.accessToken
              ? { Authorization: `Bearer ${session.accessToken}` }
              : {},
          }
        );
        if (res.ok) {
          setDocs(await res.json());
        } else {
          setDocs(null);
          setError("Failed to fetch docs.");
        }
      } catch {
        setDocs(null);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [params.projectId, session?.accessToken]);

  return (
    <div className="container mx-auto">
      <ProjectNav projectId={params.projectId} active="docs" />
      <h1 className="text-xl font-bold mb-4">Project Documentation</h1>
      {error && <div className="bg-red-100 text-red-700 px-3 py-2 mb-3 rounded">{error}</div>}
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {loading ? "Loading..." : docs ? JSON.stringify(docs, null, 2) : "Failed to load docs"}
      </pre>
    </div>
  );
}