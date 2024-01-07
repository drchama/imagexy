import type { Metadata } from "next";
import "./globals.css";
import { MainThemeProvider } from "./MainThemeProvider";

export const metadata: Metadata = {
  title: "ImageXY",
  description: "ImageXY",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainThemeProvider>{children}</MainThemeProvider>
      </body>
    </html>
  );
}
