import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "primereact/resources/primereact.css";
import { twMerge } from "tailwind-merge";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} max-w-layout w-full mx-auto`}>
          {children}
          <Toaster position="bottom-center" reverseOrder={true} />
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </Providers>
    </html>
  );
}
