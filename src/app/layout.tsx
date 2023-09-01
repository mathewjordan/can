import "./globals.css";
import "@radix-ui/themes/styles.css";

import { Theme, ThemeOptions } from "@radix-ui/themes";

import Header from "@/components/Header/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const theme: ThemeOptions = {
  appearance: "light",
  accentColor: "indigo",
  grayColor: "slate",
  panelBackground: "translucent",
  scaling: "110%",
  radius: "medium",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme {...theme}>
          <Header />
          {children}
        </Theme>
      </body>
    </html>
  );
}
