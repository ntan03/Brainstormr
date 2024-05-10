import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ConvexClientProvider } from "@/providers/convex-client-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrainStormr",
  description: "Powered by Next JS 14",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
