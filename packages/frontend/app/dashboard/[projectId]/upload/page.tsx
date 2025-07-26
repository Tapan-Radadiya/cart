'use client';

import { useRef, useState } from 'react';

export default function UploadPage({ params }: { params: { projectId: string } }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const body = new FormData();
    body.append('file', file);
    body.append('projectId', params.projectId);

    setStatus('Uploading...');
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3333'}/api/upload`, {
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