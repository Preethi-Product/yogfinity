import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YOGFINITY | Engineer Your Body. Master Your Movement.",
  description:
    "Premium movement and wellness studio blending ancient yogic wisdom, fascia intelligence, mobility science, and conscious recovery systems.",
  keywords: [
    "yoga",
    "fascia",
    "mobility",
    "wellness",
    "movement science",
    "recovery",
    "YOGFINITY",
  ],
  authors: [{ name: "YOGFINITY" }],
  openGraph: {
    title: "YOGFINITY | Engineer Your Body. Master Your Movement.",
    description:
      "Where ancient yogic wisdom meets modern fascia science and movement intelligence.",
    type: "website",
    locale: "en_US",
    siteName: "YOGFINITY",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOGFINITY",
    description:
      "Premium movement and wellness studio — fascia intelligence, mobility science, conscious recovery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased bg-obsidian text-ivory`}
      >
        {children}
      </body>
    </html>
  );
}
