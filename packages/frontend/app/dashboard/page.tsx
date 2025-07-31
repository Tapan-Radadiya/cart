"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
      setLoading(false);
    };
    if (session?.accessToken) fetchProjects();
  }, [session?.accessToken]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-2">
          {projects.length === 0 ? (
            <li className="border rounded p-4 text-gray-500">No projects yet.</li>
          ) : (
            projects.map((project) => (
              <li key={project.id} className="border rounded p-4">
                {project.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}