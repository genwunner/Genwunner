import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

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
    icon: '/images/logos/g1r-ball-white.png',
    apple: '/images/logos/g1r-ball-white.png',
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
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${bebasNeue.variable}
        ${pressStart.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col" style={{ background: 'var(--color-brand-black)', color: 'var(--color-brand-white)' }}>
        {children}
      </body>
    </html>
  );
}
