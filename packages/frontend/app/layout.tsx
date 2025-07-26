import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="w-full bg-gray-100 py-4 px-8 flex justify-between items-center">
          <span className="font-bold text-lg">AI Docs Platform</span>
          <ul className="flex space-x-4">
            <li>
              <a href="/dashboard" className="hover:underline">Dashboard</a>
            </li>
            <li>
              <a href="/login" className="hover:underline">Login</a>
            </li>
          </ul>
        </nav>
        <main className="max-w-4xl mx-auto py-8">{children}</main>
      </body>
    </html>
  );
}