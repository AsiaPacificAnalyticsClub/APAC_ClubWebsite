import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { twMerge } from "tailwind-merge";

const dmSans = DM_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "APAC",
  description: "Asia Pacific Analytics Club Website",
  icons: "/apaclogo.png",
  verification: {
    google: "i1aubWiItRKhg9Y4R6qSIXm2dgzpGDpYyCXuRx5NXz4", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(dmSans.className, "antialiased bg-white")}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
