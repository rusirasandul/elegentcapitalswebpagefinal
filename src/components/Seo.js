import { useEffect } from 'react';

const SITE_NAME = 'Elegant Capitals (PVT) LTD';
const SITE_TITLE = 'Elegant Capitals (PVT) LTD | Business & Financial Consulting';
const SITE_DESCRIPTION = 'Elegant Capitals (PVT) LTD provides business strategy, financial advisory, operations optimization, risk management, and leadership consulting for growing organizations. Your Ambition, Our Precision.';
const SITE_KEYWORDS = 'Elegant Capitals, business consulting, financial advisory, operations optimization, risk management, leadership development, strategic planning, consulting firm';
const SOCIAL_LINKS = [
  'https://www.linkedin.com/company/elegant-capitals',
  'https://www.instagram.com/elegant_capitals/',
  'https://www.facebook.com/elegantcapitals'
];

const getAbsoluteUrl = (path) => {
  if (typeof window === 'undefined') {
    return path;
  }

  const baseUrl = window.location.origin;
  const publicPath = process.env.PUBLIC_URL || '';
  return `${baseUrl}${publicPath}${path}`.replace(/([^:]\/)\/+/g, '$1');
};

const upsertMetaTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLinkTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

function Seo() {
  useEffect(() => {
    const canonicalUrl = window.location.origin + window.location.pathname;
    const logoUrl = getAbsoluteUrl('/images/logo/logo.jpeg');

    document.title = SITE_TITLE;

    upsertMetaTag('meta[name="description"]', { name: 'description', content: SITE_DESCRIPTION });
    upsertMetaTag('meta[name="keywords"]', { name: 'keywords', content: SITE_KEYWORDS });
    upsertMetaTag('meta[name="author"]', { name: 'author', content: SITE_NAME });
    upsertMetaTag('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    upsertMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMetaTag('meta[property="og:title"]', { property: 'og:title', content: SITE_TITLE });
    upsertMetaTag('meta[property="og:description"]', { property: 'og:description', content: SITE_DESCRIPTION });
    upsertMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMetaTag('meta[property="og:image"]', { property: 'og:image', content: logoUrl });
    upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: SITE_TITLE });
    upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: SITE_DESCRIPTION });
    upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: logoUrl });
    upsertLinkTag('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const existingJsonLd = document.getElementById('seo-structured-data');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seo-structured-data';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: canonicalUrl,
      logo: logoUrl,
      sameAs: SOCIAL_LINKS
    });
    document.head.appendChild(script);

    return () => {
      const jsonLd = document.getElementById('seo-structured-data');
      if (jsonLd) {
        jsonLd.remove();
      }
    };
  }, []);

  return null;
}

export default Seo;