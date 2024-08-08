import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileHeader from "@/components/MobileHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Florida Springs Deep Dive",
  description: "The best website for the florida springs!",
  icons: {
    icon: "/icons/snorkel.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className= 'flex flex-col'>
        <div className="app-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
