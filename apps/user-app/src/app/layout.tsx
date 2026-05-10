import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '../components/analytics';
import { ChatWidget } from '../components/chat-widget';
import { UserNav } from '../components/nav';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Dashboard — Longcare',
  description: 'Your AI learning dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body style={{ paddingTop: 56 }}>
        <UserNav />
        <Analytics />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
