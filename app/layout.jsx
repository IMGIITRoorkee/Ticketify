"use client"; // Mark this as a Client Component

import Nav from "./(components)/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="flex flex-col h-screen max-h-screen">
            <Nav />
            <div className="flex-grow overflow-y-auto bg-page text-default-text">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
