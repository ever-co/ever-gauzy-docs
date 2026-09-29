/**
 * Swizzled DocBreadcrumbs/StructuredData (ejected from @docusaurus/theme-classic 3.9.2) -- the
 * BreadcrumbList JSON-LD names every page by the URL the site actually serves.
 *
 * Upstream builds each `item` from the raw sidebar href, which never carries a trailing slash:
 * Docusaurus adds the slash at render time inside <Link>, and this component does not go through
 * <Link>. With trailingSlash: true every one of those URLs answers 301 (docs.gauzy.co, 2026-09-28:
 * 1,191 items on 592 pages), so search engines were handed redirects as breadcrumb targets. The
 * visible breadcrumbs were never affected -- they render through <Link>.
 *
 * The only change from upstream: each internal href gets the trailing-slash rule <Link> applies
 * before the upstream hook builds the list. Still true in @docusaurus/plugin-content-docs 3.10.2;
 * drop this swizzle once upstream applies the rule itself.
 */
import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useBreadcrumbsStructuredData} from '@docusaurus/plugin-content-docs/client';
import type {Props} from '@theme/DocBreadcrumbs/StructuredData';

// Same rule as applyTrailingSlash in @docusaurus/utils-common (what <Link> uses), which is not a
// direct dependency of this site. Only internal paths are touched.
function applySiteTrailingSlash(
  href: string,
  trailingSlash: boolean | undefined,
  baseUrl: string,
): string {
  if (trailingSlash === undefined || !href.startsWith('/')) {
    return href;
  }
  // The slash goes on the path, before any ?search or #hash.
  const [pathname] = href.split(/[#?]/);
  if (pathname === '/' || pathname === baseUrl) {
    return href;
  }
  let servedPathname = pathname;
  if (trailingSlash && !pathname.endsWith('/')) {
    servedPathname = `${pathname}/`;
  } else if (!trailingSlash && pathname.endsWith('/')) {
    servedPathname = pathname.slice(0, -1);
  }
  return href.replace(pathname, servedPathname);
}

export default function DocBreadcrumbsStructuredData(props: Props): ReactNode {
  const {
    siteConfig: {trailingSlash, baseUrl},
  } = useDocusaurusContext();
  const structuredData = useBreadcrumbsStructuredData({
    breadcrumbs: props.breadcrumbs.map((breadcrumb) =>
      breadcrumb.href
        ? {
            ...breadcrumb,
            href: applySiteTrailingSlash(breadcrumb.href, trailingSlash, baseUrl),
          }
        : breadcrumb,
    ),
  });
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Head>
  );
}
