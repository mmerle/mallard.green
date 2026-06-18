const SITE_NAME = 'Mallard Green';
const SITE_URL = 'https://www.mallard.green';
const DEFAULT_DESCRIPTION =
  'Creative development practice. Designing and building products and technical systems.';

type SiteMetaOptions = {
  title?: string;
  description?: string;
  path?: string;
};

export function siteMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
}: SiteMetaOptions = {}) {
  const resolvedTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;
  const url = new URL(path, SITE_URL).toString();

  return [
    { title: resolvedTitle },
    { name: 'description', content: description },
    { name: 'application-name', content: SITE_NAME },
    { name: 'robots', content: 'index, follow' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-title', content: SITE_NAME },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    { property: 'og:title', content: resolvedTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: SITE_NAME },
  ];
}
