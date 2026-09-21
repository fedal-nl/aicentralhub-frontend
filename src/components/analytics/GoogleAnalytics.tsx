'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Consent Mode: analytics storage is DENIED by default and only
          // granted once the visitor accepts the cookie banner. A previously
          // stored "accepted" choice is restored here, before GA is configured,
          // so no analytics cookies are set ahead of consent.
          var storedConsent = null;
          try { storedConsent = window.localStorage.getItem('cookie_consent'); } catch (e) {}
          gtag('consent', 'default', {
            analytics_storage: storedConsent === 'accepted' ? 'granted' : 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          });

          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
