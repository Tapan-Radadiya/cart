'use client';

import { useEffect, useState } from 'react';

export default function DocsPage({ params }: { params: { projectId: string } }) {
  const [docs, setDocs] = useState<string>('Loading...');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}/api/projects/${params.projectId}/docs`)
      .then(res => res.json())
      .then(data => setDocs(data.docs || 'No docs found'))
      .catch(() => setDocs('Error loading docs'));
  }, [params.projectId]);

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