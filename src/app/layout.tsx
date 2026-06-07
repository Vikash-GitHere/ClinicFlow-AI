import type { Metadata } from "next";
import { SetupBanner } from "@/components/setup-banner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ClinicFlow AI",
    template: "%s | ClinicFlow AI",
  },
  description:
    "AI-powered clinic workflow tool for small clinics and solo doctors. Reduce paperwork and finish documentation in under 60 seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SetupBanner />
        {children}
      </body>
    </html>
  );
}
