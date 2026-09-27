import type { Config } from "@docusaurus/types";
import type { Options as PresetOptions, ThemeConfig } from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

require("dotenv").config();
const SENTRY_DNS = process.env.NEXT_PUBLIC_SENTRY_DNS || null;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || null;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY || null;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || null;
const HAS_ALGOLIA_CREDENTIALS =
  ALGOLIA_APP_ID && ALGOLIA_API_KEY && ALGOLIA_INDEX_NAME;

// Every locale the site is set up for (the sources are under docs/i18n).
const ALL_LOCALES = [
  "en",
  "fr",
  "ar",
  "bg",
  "zh",
  "nl",
  "de",
  "he",
  "it",
  "pl",
  "pt",
  "ru",
  "es",
];
// Locales actually advertised: the hreflang alternates, og:locale:alternate and the language dropdown.
//
// The image builds English only (`yarn build --locale en` in Dockerfile.everk8s), yet all thirteen
// were declared. Measured on docs.gauzy.co on 2026-09-27: every page carried thirteen hreflang
// alternates (fr, ar, bg ...) that all named the English URL, and /fr/, /ar/, /bg/ ... answered 404.
// The translation sources under docs/i18n are kept; DOCS_LOCALES opts locales back in ("all", or a
// list such as "en,fr"). Set it only together with a build that emits those locales, or the dead
// alternates come back.
const DOCS_LOCALES = (process.env.DOCS_LOCALES || "en").trim();
const LOCALES =
  DOCS_LOCALES === "all"
    ? ALL_LOCALES
    : ALL_LOCALES.filter(
        (locale) =>
          locale === "en" ||
          DOCS_LOCALES.split(",")
            .map((wanted) => wanted.trim())
            .includes(locale),
      );

/** @type {import('@docusaurus/types').Config} */
const config: Config = {
  // Fail the build on a broken link instead of warning past it.
  //
  // With "warn", Docusaurus detected all 105 broken links this repo shipped and built anyway --
  // that is why they reached docs.gauzy.co. The link fixes are the cleanup; this line is what stops
  // it recurring.
  onBrokenLinks: "throw",
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    SENTRY_DNS &&
      process.env.NODE_ENV === "production" && [
        "docusaurus-plugin-sentry",
        {
          DSN: process.env.NEXT_PUBLIC_SENTRY_DNS,
        },
      ],
      !HAS_ALGOLIA_CREDENTIALS && [
        require.resolve('@easyops-cn/docusaurus-search-local'),{
          hashed: true,
        }
      ],
      // # MAKE A BUILD ERROR FOR NOW
      // [require.resolve("@cmfcmf/docusaurus-search-local"), { indexDocs: true }],
  ],
  // Add custom scripts here that would be placed in <script> tags.
  scripts: [{ src: "https://buttons.github.io/buttons.js", async: true }],
  // Title for your website.
  title: "Ever Gauzy™ Platform",
  tagline: "Business Management Platform (ERP/CRM/HRM)",
  favicon: "img/favicon.png",
  // Set the production Url of your site here
  url: "https://docs.gauzy.co",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  // Emit every URL with a trailing slash, matching how the site is actually served.
  //
  // The build writes each route as a directory (api/overview/index.html), so nginx answers the
  // slash-less URL with a 301 to the slash form. Without this flag the canonical, og:url, hreflang,
  // sitemap and internal links all used the slash-less form, so the canonical named a redirect
  // instead of the page itself (measured on docs.gauzy.co on 2026-09-27: 593 of 595 sitemap entries
  // answered 301, e.g. https://docs.gauzy.co/api/overview declared as canonical by the page served
  // at https://docs.gauzy.co/api/overview/).
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ever-co",
  // Used for publishing and more
  projectName: "ever-gauzy-docs",
  staticDirectories: ["./docs/assets", "static"],
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    path: "./docs/i18n/",
    defaultLocale: "en",
    // Gated by DOCS_LOCALES -- see LOCALES at the top of this file.
    locales: LOCALES,
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          routeBasePath: '/',
          exclude: ["**/i18n/**", "**/assets/**"],
          sidebarPath: "./sidebars.ts",
          path: "./docs/",
          editUrl:
            "https://github.com/ever-co/ever-gauzy-docs/tree/main/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          // /search/ is the local search plugin's results page: an empty shell until a query runs,
          // not a document. It was listed in the sitemap as a page to index (docs.gauzy.co/sitemap.xml,
          // 2026-09-27). The page itself stays served.
          ignorePatterns: ["/search/**"],
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // Replace with your project's social card
      image: "/overview.png",
      colorMode: {
        defaultMode: "dark",
      },
      navbar: {
        style: "dark",
        logo: {
          alt: "Gauzy™ Platform Logo",
          src: "/logo_Gauzy.svg",
          srcDark: "/logoDark.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Docs",
          },
          {
            to: "/support",
            label: "Support",
            position: "left",
          },
          // Shown only when more than one locale is advertised (see LOCALES at the top of this file).
          //
          // With English alone the dropdown is a one-entry "English" menu on every page, and on
          // 404.html its only entry links to /404/, which is itself a 404 (the one 4xx link left in
          // the English build on 2026-09-27). It comes back by itself once DOCS_LOCALES adds a locale.
          ...(LOCALES.length > 1
            ? [
                {
                  type: "localeDropdown",
                  position: "right",
                  className: "header-locale-link",
                },
              ]
            : []),
          {
            href: "https://github.com/ever-co/ever-gauzy",
            label: "GitHub",
            position: "right",
            className: "header-github-link",
          },
        ],
      },
      footer: {
        style: "dark",

        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/",
              },
              {
                label: "Quick Start",
                to: "/getting-started/quick-start",
              },
              {
                label: "Architecture",
                to: "/architecture/overview",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.com/invite/msqRJ4w",
              },
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/gauzy",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/gauzyplatform",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/ever-co/ever-gauzy",
              },
              {
                label: "Website",
                href: "https://gauzy.co",
              },
              {
                label: "Demo",
                href: "https://demo.gauzy.co",
              },
            ],
          },
        ],
        copyright: `Copyright © 2023-Present Ever Co. LTD.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: HAS_ALGOLIA_CREDENTIALS
        ? {
          // The application ID provided by Algolia
        appId: process.env.ALGOLIA_APP_ID,
        
        // Public API key: it is safe to commit it
        apiKey: process.env.ALGOLIA_API_KEY,

        // The index name to query
        indexName: process.env.ALGOLIA_INDEX_NAME,

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: "/docs/", // or as RegExp: /\/docs\//
          to: "/",
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,

            //... other Algolia params
          }
        : undefined,
    },
};

export default config;
