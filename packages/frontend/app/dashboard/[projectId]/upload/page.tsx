"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import ProjectNav from "components/ProjectNav";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

async function handleUpload(formData: FormData) {
  setLoading(true);
  try {
    await uploadFile(params.projectId, formData);
    router.push(`/dashboard/${params.projectId}/files`);
  } catch (error) {
    toast.error("Failed to upload file");
    setLoading(false);
  }
}

return (
  <main className="flex-1">
    <div className="mx-auto max-w-md pt-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Upload a File
      </h1>
      <form className="flex flex-col gap-4" action={handleUpload}>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          type="file"
          name="file"
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading && <Spinner size="sm" className="mr-2" />}
          Upload
        </button>
      </form>
    </div>
  </main>
);
}