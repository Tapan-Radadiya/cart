"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function NavBar() {
  const { data: session } = useSession();
  return (
    <nav className="w-full bg-gradient-to-r from-brand-600 to-brand-500 text-white py-4 px-8 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <span className="font-extrabold text-lg tracking-wide">Gemini AI Docs</span>
      <ul className="flex space-x-4 items-center">
        <li>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-brand-100"
          >
            Dashboard
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <button
                className="transition-colors hover:text-brand-100"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sign out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className="transition-colors hover:text-brand-100"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="transition-colors hover:text-brand-100"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}