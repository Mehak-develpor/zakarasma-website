import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const SEO = () => {
  const { t, lang } = useLanguage();
  const url = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    // Update document lang and dir
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr';

    // Schema markup
    const businessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${url}/#business`,
      name: 'Zakarasma Umrah Taxi',
      alternateName: 'Zakarasma Tour & Taxi',
      description: t.site_description,
      url: url,
      telephone: '+966501416110',
      email: 'Zakarasma@harmain.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Makkah',
        addressRegion: 'Makkah',
        addressCountry: 'SA',
        streetAddress: 'Makkah Al-Mukarramah, Saudi Arabia',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 21.4225,
        longitude: 39.8262,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      priceRange: '$$',
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Online Payment'],
      currenciesAccepted: 'SAR',
      areaServed: [
        { '@type': 'City', name: 'Makkah' },
        { '@type': 'City', name: 'Madinah' },
        { '@type': 'City', name: 'Jeddah' },
        { '@type': 'City', name: 'Riyadh' },
        { '@type': 'City', name: 'Taif' },
        { '@type': 'Country', name: 'Saudi Arabia' },
      ],
      serviceType: ['Umrah Taxi', 'Hajj Transport', 'Airport Transfer', 'Ziyarat Tours', 'VIP Transport'],
      sameAs: [
        'https://facebook.com/zakarasma',
        'https://instagram.com/zakarasma',
        'https://wa.me/966501416110',
      ],
      hasMap: 'https://maps.app.goo.gl/w47SGshx3WfPcx46A',
    };

    const travelBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Zakarasma Umrah Taxi',
      description: t.site_description,
      url: url,
      telephone: '+966501416110',
      email: 'Zakarasma@harmain.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Makkah',
        addressCountry: 'SA',
      },
      areaServed: 'Saudi Arabia',
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I book a taxi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can book our taxi service through our website booking form, WhatsApp, or by calling our 24/7 customer support. Simply provide your pickup location, destination, date, time, and number of passengers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I pay online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we accept online payments through credit cards, debit cards, and other digital payment methods. You can also pay in cash directly to the driver.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you provide airport transfers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we offer airport transfer services from Jeddah, Madinah, and Makkah airports. Our drivers will meet you at arrivals with a name sign and assist with your luggage.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you provide Ziyarat tours?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we offer guided Ziyarat tours to all significant Islamic sites in Makkah and Madinah, including Jabal Al Noor, Cave Hira, Masjid Quba, Uhud, and more.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you operate 24/7?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, our services are available 24 hours a day, 7 days a week. You can book at any time through our website or WhatsApp.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I book in advance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we recommend booking in advance especially during peak seasons like Hajj and Ramadan. Early booking ensures vehicle availability and better rates.',
          },
        },
      ],
    };

    // Remove existing schema scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      if (script.textContent?.includes('schema.org')) {
        script.remove();
      }
    });

    // Add new schema scripts
    const schemas = [businessSchema, travelBusinessSchema, faqSchema];
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('schema.org')) {
          script.remove();
        }
      });
    };
  }, [t, lang, url]);

  return null;
};

export default SEO;
