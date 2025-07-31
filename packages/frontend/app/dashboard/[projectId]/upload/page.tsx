'use client';

import { useRef, useState } from 'react';

"use client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

export default function UploadPage({ params }: { params: { projectId: string } }) {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    formData.append("projectId", params.projectId);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"}/api/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken || ""}`,
        },
        body: formData,
      }
    );
    if (res.ok) setStatus("Upload successful!");
    else setStatus("Upload failed.");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload OpenAPI Spec</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".yaml,.json,.zip" ref={fileInputRef} className="mb-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold ml-2">
          Upload
        </button>
      </form>
      {status && <div className="mt-2">{status}</div>}
    </div>
  );
}

    setStatus('Uploading...');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}/api/upload`, {
      method: 'POST',
      body,
    });
    if (res.ok) setStatus('Upload successful!');
    else setStatus('Upload failed');
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Upload OpenAPI/Code for Project</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          ref={fileInput}
          onChange={e => setFile(e.target.files?.[0] || null)}
          accept=".yaml,.yml,.json,.zip"
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
        >
          Upload
        </button>
      </form>
      <p className="mt-4">{status}</p>
    </div>
  );
}