import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JP Transportes e Viagens",
  description: "Transporte executivo e fretamento em Vespasiano e região.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18079653881"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18079653881');
          `}
        </Script>
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var called = false;
              var callback = function () {
                if (called) {
                  return;
                }
                called = true;
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-18079653881/llv4CMfG-K4cEPm_hq1D',
                'event_callback': callback
              });
              setTimeout(callback, 1000);
              return false;
            }
          `}
        </Script>
        <Providers>
          <Navbar />
          <main className="pt-20 min-h-screen bg-white dark:bg-black text-zinc-950 dark:text-zinc-50 transition-colors duration-500">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
