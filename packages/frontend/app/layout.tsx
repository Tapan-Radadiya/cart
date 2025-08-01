import "./globals.css";
import { ReactNode } from "react";
import { SessionProviderWrapper } from "./session-provider";
import { NavBar } from "../components/NavBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProviderWrapper>
          <NavBar />
          <main className="container mx-auto py-8">{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}