"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function NavBar() {
  const { data: session } = useSession();
  return (
    <nav className="w-full bg-gray-100 py-4 px-8 flex justify-between items-center">
      <span className="font-bold text-lg">AI Docs Platform</span>
      <ul className="flex space-x-4 items-center">
        <li>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <button
                className="hover:underline"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sign out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}