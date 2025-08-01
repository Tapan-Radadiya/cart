"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import ProjectNav from "@/components/ProjectNav";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export default function UploadPage({ params }: { params: { projectId: string } }) {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setError(null);
    const body = new FormData();
    body.append("file", file);
    body.append("projectId", params.projectId);

    setStatus("Uploading...");
    try {
      const res = await fetch(
        `${API_URL}/api/upload`,
        {
          method: "POST",
          headers: session?.accessToken
            ? { Authorization: `Bearer ${session.accessToken}` }
            : {},
          body,
        }
      );
      if (res.ok) setStatus("Upload successful!");
      else {
        setStatus("Upload failed");
        setError("Upload failed. Please try again.");
      }
    } catch {
      setStatus("Upload failed");
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <ProjectNav projectId={params.projectId} active="upload" />
      <h1 className="text-xl font-bold mb-4">Upload OpenAPI/Code for Project</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          ref={fileInput}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept=".yaml,.yml,.json,.zip"
          className="mb-4"
        />
        <button
          type="submit"
          disabled={!file}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded transition"
        >
          {status === "Uploading..." ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <div className="bg-red-100 text-red-700 px-3 py-2 mt-3 rounded">{error}</div>}
      <p className="mt-4">{status}</p>
    </div>
  );
}