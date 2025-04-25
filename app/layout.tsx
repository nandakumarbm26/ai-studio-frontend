import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/components/ui/alert";
import { AuthProvider } from "@/aicomponents/UIComponents/AuthUI";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astraph.AI",
  description:
    "Lightning-fast intelligence. Build, train, and deploy AI models with blazing speed and clarity.",
  metadataBase: new URL("https://astraphai.vercel.app/"), // replace with actual domain
  keywords: [
    "AI platform",
    "model training",
    "RAG",
    "prompt orchestration",
    "LLMs",
    "AI deployment",
    "Astraph.AI",
  ],
  openGraph: {
    title: "Astraph.AI",
    description:
      "Lightning-fast intelligence. Build, train, and deploy AI models with blazing speed and clarity.",
    url: "https://astraphai.vercel.app/",
    siteName: "Astraph.AI",
    images: [
      {
        url: "/assets/logo/astraph.png", // make sure this is in your /public
        width: 1200,
        height: 630,
        alt: "Astraph.AI - Lightning-fast AI Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astraph.AI",
    description:
      "Lightning-fast intelligence. Build, train, and deploy AI models with blazing speed and clarity.",
    images: ["/assets/logo/astraph.png"],
    creator: "@yourTwitterHandle", // optional
  },
  authors: [{ name: "Astraph.AI Team", url: "https://astraphai.vercel.app/" }],
  creator: "Astraph.AI",
  publisher: "Astraph.AI",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: "/assets/favicon/favicon.ico",
    shortcut: "/assets/favicon/favicon.ico",
    apple: "/assets/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AlertProvider>
          <AuthProvider>
            <main className="w-[100vw] overflow-x-clip hide-scrollbar">
              {children}
            </main>
          </AuthProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
