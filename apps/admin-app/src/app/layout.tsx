import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '../components/analytics';
import { ChatWidget } from '../components/chat-widget';
import { AdminSidebar } from '../components/AdminSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Admin — BookedAI',
  description: 'Admin and revenue operations dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans dark", geist.variable)}>
      <body>
        <SidebarProvider defaultOpen={true}>
          <AdminSidebar />
          <SidebarInset className="bg-[#050510] overflow-y-auto">
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e1e3a',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f0f0f8',
            },
          }}
        />
        <Analytics />
        <ChatWidget />
      </body>
    </html>
  );
}
