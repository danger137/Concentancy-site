import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "../styles/bootstrap.min.css";
import "../styles/font-awesome.min.css";
import "../styles/global.css";
import SiteShell from "@/components/SiteShell";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://infinityconsultants.pk"),
  title: "Infinity Overseas Consultants | Study Abroad & Immigration Experts",
  description: "Infinity Overseas Consultants provides expert guidance for study abroad, student visas, and immigration to UK, USA, Canada, and Europe. Turn rejection into opportunity.",
  keywords: [
    "Study in UK from Pakistan", "Study in Europe from Pakistan", "Schengen student visa Pakistan",
    "Affordable medical education Europe", "Study in Turkey Pakistan", "Study in Hungary Stipendium Hungaricum",
    "Romania MBBS for Pakistani students", "Georgia student visa Pakistan", "Cheapest European countries to study from Pakistan",
    "Cyprus student visa Pakistan", "Study in Sweden without IELTS", "Ireland 2-year stay back visa",
    "France Campus France Pakistan", "Italy student visa requirements", "Spain student visa Pakistan",
    "Malta study visa", "Dubai student visa from Pakistan", "Finland scholarship Pakistan",
    "Denmark student residence permit", "Romania medical university admission", "How to apply for Stipendium Hungaricum from Pakistan",
    "Cheapest MBBS in Europe for Pakistani students", "Study in Georgia without IELTS", "UK student visa financial requirements Pakistan",
    "Schengen student visa processing time Pakistan", "study abroad consultant Faisalabad", "Infinity Overseas Consultants"
  ],
  authors: [{ name: "Khurram Hashmi" }],
  creator: "Infinity Overseas Consultants",
  publisher: "Infinity Overseas Consultants",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/Infinity-Logo-new.jpg",
  },
  openGraph: {
    title: "Infinity Overseas Consultants | Study Abroad & Immigration Experts",
    description: "Expert guidance for study abroad and immigration. 100% success rate in major visa categories.",
    url: "https://infinityconsultants.pk", // Note: Replace with actual domain if different
    siteName: "Infinity Overseas Consultants",
    images: [
      {
        url: "/Infinity-Logo-new.jpg",
        width: 800,
        height: 600,
        alt: "Infinity Overseas Consultants Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Overseas Consultants",
    description: "Study abroad and immigration experts. Turn rejection into opportunity.",
    images: ["/Infinity-Logo-new.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Infinity Overseas",
    statusBarStyle: "default",
    capable: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Infinity Overseas Consultants",
  "alternateName": "Infinity Consultants",
  "url": "https://infinityconsultants.pk",
  "logo": "https://infinityconsultants.pk/Infinity-Logo-new.jpg",
  "image": "https://infinityconsultants.pk/img/hero_main.png",
  "description": "Expert study abroad and immigration consultancy in Faisalabad. We specialize in student visas for UK, USA, Canada, and Europe.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Mazzanine floor, Media com plaza, Office No. 63, 64 Kohinoor Rd",
    "addressLocality": "Faisalabad",
    "addressRegion": "Punjab",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "31.4187",
    "longitude": "73.1162"
  },
  "telephone": "+92 326 4571906",
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+92 326 4571906",
    "contactType": "customer service",
    "areaServed": "PK",
    "availableLanguage": ["English", "Urdu", "Punjabi"]
  },
  "sameAs": [
    "https://facebook.com/infinityconsultants",
    "https://instagram.com/infinityconsultants"
  ]
};

import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { prisma } from "@/lib/prisma";
import ClientWidgets from "@/components/ClientWidgets";

async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findUnique({ where: { id: 'default' } });
    return settings || {
      email: 'Infinityconsultantsfsd@gmail.com',
      phone: '+92 326 4571906',
      location: 'Mazzanine floor, Media com plaza, Office No. 63, 64 Kohinoor Rd, Faisalabad'
    };
  } catch (e) {
    return {
      email: 'Infinityconsultantsfsd@gmail.com',
      phone: '+92 326 4571906',
      location: 'Mazzanine floor, Media com plaza, Office No. 63, 64 Kohinoor Rd, Faisalabad'
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        
        {/* Apple Touch Icon for better mobile SEO */}
        <link rel="apple-touch-icon" sizes="180x180" href="/Infinity-Logo-new.jpg" />
        
        {/* Preload critical font early */}
        <link rel="dns-prefetch" href="//embed.tawk.to" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Breadcrumb Schema — helps Google show site hierarchy in results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://infinityconsultants.pk" },
                { "@type": "ListItem", "position": 2, "name": "About", "item": "https://infinityconsultants.pk/about" },
                { "@type": "ListItem", "position": 3, "name": "Services", "item": "https://infinityconsultants.pk/services" },
                { "@type": "ListItem", "position": 4, "name": "Blog", "item": "https://infinityconsultants.pk/blog" }
              ]
            }) 
          }}
        />
        {/* Fallback for CSS animations if JS is disabled */}
        <noscript>
          <style>{`
            [style*="opacity: 0"], .reveal { opacity: 1 !important; transform: none !important; }
          `}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${inter.className} d-flex flex-column min-vh-100`}>
        <SmoothScrollWrapper>
          <SiteShell settings={await getSettings()}>{children}</SiteShell>
        </SmoothScrollWrapper>
        <ClientWidgets />
        <Script
          src="/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
        {/* Tawk.to Chat Widget — lazy loaded for performance */}
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            Tawk_API.customStyle = {
                visibility : {
                    desktop : {
                        position : 'br',
                        xOffset : 40,
                        yOffset : 85
                    },
                    mobile : {
                        position : 'br',
                        xOffset : 10,
                        yOffset : 80
                    }
                }
            };
            Tawk_API.onLoad = function(){
                if(window.innerWidth <= 360){
                    var el = document.querySelector('iframe[title="chat widget"]');
                    if(el && el.parentElement){
                        var p = el.parentElement;
                        p.style.setProperty('width','50px','important');
                        p.style.setProperty('height','50px','important');
                        p.style.setProperty('right','10px','important');
                        p.style.setProperty('bottom','80px','important');
                        p.style.setProperty('left','auto','important');
                    }
                    var container = document.querySelector('.tawk-min-container');
                    if(container){
                        container.style.setProperty('right','10px','important');
                        container.style.setProperty('bottom','80px','important');
                        container.style.setProperty('left','auto','important');
                    }
                }
            };
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/69aa29eb4716c51c37026458/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
