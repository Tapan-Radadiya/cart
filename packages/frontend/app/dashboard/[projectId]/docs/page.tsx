"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DocsPage({ params }: { params: { projectId: string } }) {
  const { data: session } = useSession();
  const [docs, setDocs] = useState<string>("Loading...");

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"}/api/docs?projectId=${params.projectId}`,
        {
          headers: session?.accessToken
            ? { Authorization: `Bearer ${session.accessToken}` }
            : {},
        }
      );
      if (res.ok) {
        setDocs(await res.text());
      } else {
        setDocs("Failed to load docs");
      }
    };
    fetchDocs();
  }, [params.projectId, session?.accessToken]);

  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Project Documentation</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{docs}</pre>
    </div>
  );
}