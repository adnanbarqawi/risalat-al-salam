import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "رسالة السلام | The Message of Peace",
  description:
    "A spiritual sanctuary for reflection, peace, forgiveness, and love. Connect with timeless wisdom and personal guidance.",
  keywords: [
    "Message of Peace",
    "Spiritual Guidance",
    "Peace",
    "Forgiveness",
    "Love",
    "Connection with God",
    "Personal Spiritual Growth",
    "رسالة السلام",
  ],
  openGraph: {
    title: "رسالة السلام | The Message of Peace",
    description:
      "A spiritual sanctuary for reflection, peace, forgiveness, and love.",
    type: "website",
    locale: "en_US",
    siteName: "The Message of Peace",
  },
  twitter: {
    card: "summary_large_image",
    title: "رسالة السلام | The Message of Peace",
    description:
      "A spiritual sanctuary for reflection, peace, forgiveness, and love.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
