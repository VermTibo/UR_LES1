import { AppToaster } from "@/components/ui/toast"
import GlobalNavbar from "@/components/GlobalNavbar"
import Footer from "@/components/Footer"

import Script from "next/script"
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker"

import { Momo_Trust_Display, JetBrains_Mono } from 'next/font/google'
import "./globals.css"

const Momo = Momo_Trust_Display({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400'], 
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
})

// HIER ZET JE DE VIEWPORT (Cruciaal voor mobiel!)
export const metadata = {
  title: "Tibo | Portfolio",
  description: "Grafisch Vormgever & Fotograaf",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${Momo.variable} ${jetbrains.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>

      <body className="font-sans overflow-x-hidden">
        <GoogleAnalyticsTracker />
        <GlobalNavbar />

        {/* AANGEPAST: Geen vaste p-20 meer, maar responsive padding */}
        <div className="px-4 md:px-10 lg:px-20 mx-auto mt-10 md:mt-20">
          {children}
        </div>

        {/* Footer alleen vastzetten als dat echt de bedoeling is, 
            anders blokkeert het content op mobiel */}
        <div className="relative md:fixed md:bottom-0 md:left-0 md:right-0 z-50">
          <Footer />
        </div>

        <AppToaster />
      </body>
    </html>
  )
}