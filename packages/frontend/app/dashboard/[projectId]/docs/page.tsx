'use client';

import { useEffect, useState } from 'react';

"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DocsPage({ params }: { params: { projectId: string } }) {
  const { data: session } = useSession();
  const [docs, setDocs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.accessToken) return;
    const fetchDocs = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"}/api/projects/${params.projectId}/docs`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setDocs(data);
      }
      setLoading(false);
    };
    fetchDocs();
  }, [params.projectId, session?.accessToken]);

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Project Docs</h1>
      {loading ? (
        <div>Loading...</div>
      ) : docs ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(docs, null, 2)}</pre>
      ) : (
        <div>No docs found for this project.</div>
      )}
    </div>
  );
}

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Documentation</h1>
      <div className="prose max-w-none">
        {/* TODO: Render markdown */}
        <pre>{docs}</pre>
      </div>
    </div>
  );
}