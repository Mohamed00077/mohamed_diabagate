import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  
  title: "Mohamed Diabagate | Développeur Full Stack NestJS & Next.js",
  description: "Découvrez le portfolio de Mohamed Diabagate, développeur Full Stack spécialisé dans la création d'applications web modernes, performantes et scalables.",
  keywords: ["Mohamed Diabagate", "Développeur Full Stack", "NestJS", "Next.js", "React", "Portfolio Développeur", "Abidjan", "Côte d'Ivoire"],
  authors: [{ name: "Mohamed Diabagate" }],
  creator: "Mohamed Diabagate",
  openGraph: {
    title: "Mohamed Diabagate | Développeur Full Stack",
    description: "Portfolio de Mohamed Diabagate. Explorez mes projets et mes compétences en développement web.",
    url: "https://mohamed-diabagate.vercel.app/", 
    siteName: "Mohamed Diabagate Portfolio",
    images: [
      {
        url: "https://votre-domaine.com", // Image qui s'affichera sur LinkedIn/Twitter
        width: 1200,
        height: 630,
        alt: "Mohamed Diabagate - Développeur Full Stack",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Diabagate | Développeur Full Stack",
    description: "Portfolio de Mohamed Diabagate. Découvrez mes réalisations.",
    images: ["https://mohamed-diabagate.vercel.app/"],
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
