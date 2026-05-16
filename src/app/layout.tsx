// src/app/layout.tsx
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

// Courier New is a system font — loaded via CSS, no Next.js import needed
// Press Start 2P still used for pixel accent labels
const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GENWUNNER: Creator of Big Man Blastoise | PokéRage",
  description:
    "Genwunner is a Los Angeles-based PokéRage artist and creator of the viral Big Man Blastoise movement. 543K monthly listeners. Stream, join the Wunnerdex, and catch the chaos.",
  openGraph: {
    title: "GENWUNNER: PokéRage",
    description: "Creator of Big Man Blastoise. 543K monthly listeners. The PokéRage movement starts here.",
    siteName: "GENWUNNER",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GENWUNNER: PokéRage",
    description: "Creator of Big Man Blastoise. The PokéRage movement.",
  },
  icons: {
    icon: '/images/logos/rrr-logo-2.png',
    apple: '/images/logos/rrr-logo-2.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ background: '#000', color: '#cc0000' }}
      >
        {children}
      </body>
    </html>
  );
}
