"use client";
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
      <head>
        <title>Ticket System</title>
        <meta name="description" content="Creating a functional ticketing system." />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <div className="flex flex-col h-screen max-h-screen">
            <Nav />
            <div className="flex-grow overflow-y-auto bg-light-page dark:bg-page text-light-default-text dark:text-default-text">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
