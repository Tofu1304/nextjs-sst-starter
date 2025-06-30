import { SITE_DESCRIPTION, SITE_TITLE, TOASTER_DURATION_MS } from "@/constants";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React, { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Toaster
            toastOptions={{
              style: {
                fontSize: "0.875rem",
              },
              duration: TOASTER_DURATION_MS,
            }}
          />
        </body>
      </html>
    </>
  );
};

export default RootLayout;
