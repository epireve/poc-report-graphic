import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sustainability Report Generator",
  description: "Generate professional sustainability reports with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
