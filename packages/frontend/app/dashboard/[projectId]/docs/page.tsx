"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DocsPage({ params }: { params: { projectId: string } }) {
  const { data: session } = useSession();
  const [docs, setDocs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"}/api/projects/${params.projectId}/docs`,
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
        }
      } catch {
        setDocs(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [params.projectId, session?.accessToken]);

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Project Documentation</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {loading ? "Loading..." : docs ? JSON.stringify(docs, null, 2) : "Failed to load docs"}
      </pre>
    </div>
  );
}