"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createProject } from "@/lib/actions";
import { toast } from "sonner";
import { Spinner } from "@/components/Spinner";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCreateProject(formData: FormData) {
    setLoading(true);
    try {
      const projectId = await createProject(formData);
      router.push(`/dashboard/${projectId}`);
    } catch (error) {
      toast.error("Failed to create project");
      setLoading(false);
    }
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-2xl pt-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Your Projects
        </h1>
        <form
          className="mt-8 flex items-center gap-2"
          action={handleCreateProject}
        >
          <input
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
            name="name"
            placeholder="New project name"
            maxLength={48}
            required
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            disabled={loading}
          >
            {loading && <Spinner size="sm" className="mr-2" />}
            <PlusIcon className="h-5 w-5" />
            New Project
          </button>
        </form>
        <div className="mt-12">
          {/* Projects list is rendered here */}
        </div>
      </div>
    </main>
  );
}