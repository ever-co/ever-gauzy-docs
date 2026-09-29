/**
 * Swizzled DocBreadcrumbs/StructuredData (a wrapper around the @docusaurus/theme-classic 3.9.2
 * component) -- the BreadcrumbList JSON-LD names every page by the URL the site actually serves.
 *
 * Upstream builds each `item` from the raw sidebar href, which never carries a trailing slash:
 * Docusaurus adds the slash at render time inside <Link>, and this component does not go through
 * <Link>. With trailingSlash: true every one of those URLs answers 301 (docs.gauzy.co, 2026-09-28:
 * 1,191 items on 592 pages), so search engines were handed redirects as breadcrumb targets. The
 * visible breadcrumbs were never affected -- they render through <Link>.
 *
 * The upstream component still renders the JSON-LD; this wrapper only hands it every internal href
 * with the trailing-slash rule <Link> applies. Still needed in @docusaurus/plugin-content-docs
 * 3.10.2; drop this file once upstream applies the rule itself.
 */
import React, {type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StructuredData from '@theme-original/DocBreadcrumbs/StructuredData';
import type StructuredDataType from '@theme/DocBreadcrumbs/StructuredData';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof StructuredDataType>;

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

export default function StructuredDataWrapper(props: Props): ReactNode {
  const {
    siteConfig: {trailingSlash, baseUrl},
  } = useDocusaurusContext();
  return (
    <StructuredData
      {...props}
      breadcrumbs={props.breadcrumbs.map((breadcrumb) =>
        breadcrumb.href
          ? {...breadcrumb, href: applySiteTrailingSlash(breadcrumb.href, trailingSlash, baseUrl)}
          : breadcrumb,
      )}
    />
  );
}
