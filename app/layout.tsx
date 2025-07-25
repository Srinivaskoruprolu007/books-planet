import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const ibmPlexSans = localFont({
  src: [
    {
      path: "./fonts/IBMPlexSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans",
});
const bebasNeue = localFont({
  src: [
    {
      path: "./fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bebas-neue",
});
export const metadata: Metadata = {
  title: "Books Planet",
  description: "Books Planet is online book store for everyone",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.className}  antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
