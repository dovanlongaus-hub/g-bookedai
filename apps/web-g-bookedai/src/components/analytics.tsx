'use client';

import Script from 'next/script';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export function Analytics() {
  if (!GA4_ID && !GTM_ID) return null;

  return (
    <>
      {GA4_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');`}
          </Script>
        </>
      )}
      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
    </>
  );
}
