import "./globals.css";
import { ReactNode } from "react";
import { SessionProviderWrapper } from "../session-provider";
import { NavBar } from "../components/NavBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <SessionProviderWrapper>
          <main className="max-w-4xl mx-auto py-8">{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}