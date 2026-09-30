import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MEGHDRISHTI — Hyperlocal Monsoon Intelligence",
  description:
    "Block & Panchayat-scale climate intelligence for smarter agricultural decisions across India.",
  keywords: [
    "monsoon intelligence",
    "hyperlocal climate",
    "agricultural advisory",
    "soybean sowing window",
    "monsoon onset forecast",
    "Shajapur Madhya Pradesh",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#10241E] text-white selection:bg-[#176B4D] selection:text-[#FFFFFF]">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
