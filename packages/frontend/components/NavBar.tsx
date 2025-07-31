"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full bg-gray-100 py-4 px-8 flex justify-between items-center mb-6">
      <span className="font-bold text-lg">AI Docs Platform</span>
      <ul className="flex space-x-4">
        {session ? (
          <>
            <li>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <button
                className="hover:underline text-blue-600 font-semibold"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sign out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}