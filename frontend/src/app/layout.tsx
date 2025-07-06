import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getHeaderFooter } from "@/lib/service/getStrapiData";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { generateMetadata } from "@/lib/service/getStrapiData";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { data: metaData } = await generateMetadata();

export const metadata: Metadata = {
  title: metaData?.title || "",
  description: metaData?.description || "",
};

const { data } = await getHeaderFooter();
const { header, Footer: footer } = data;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header data={header} />
        <Toaster position="bottom-center" />
        <main className="flex-1">{children}</main>
        <Footer data={footer} />
      </body>
    </html>
  );
}
