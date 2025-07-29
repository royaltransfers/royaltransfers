import type { Metadata } from "next";
import { Bebas_Neue, Poppins, Be_Vietnam_Pro, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "400",
});

const beVietnamePro = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Royal Transfer | Premium UK Ride Booking Service",
  description:
    "Book luxury and reliable rides across the UK with Royal Transfer. From airport pickups to intercity travel, we offer professional drivers, comfortable cars, and 24/7 service tailored to your needs.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${poppins.variable} ${beVietnamePro.variable} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
