import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from 'prism-react-renderer';

require("dotenv").config();
const SENTRY_DNS = process.env.NEXT_PUBLIC_SENTRY_DNS || null;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || null;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY || null;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || null;
const HAS_ALGOLIA_CREDENTIALS =
  ALGOLIA_APP_ID && ALGOLIA_API_KEY && ALGOLIA_INDEX_NAME;
/** @type {import('@docusaurus/types').Config} */
const config: Config = {
  plugins: [
    SENTRY_DNS &&
      process.env.NODE_ENV === "production" && [
        "docusaurus-plugin-sentry",
        {
          DSN: process.env.NEXT_PUBLIC_SENTRY_DNS,
        },
      ],
      !HAS_ALGOLIA_CREDENTIALS && [
        require.resolve('docusaurus-plugin-search-local'),{
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

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ever-co",
  // Used for publishing and more
  projectName: "ever-gauzy-docs",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  staticDirectories: ["./docs/assets", "static"],
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    path: "./docs/i18n/",
    defaultLocale: "en",
    locales: [
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
    ],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          exclude: ["**/i18n/**", "**/assets/**"],
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          path: "./docs/",
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
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
          { to: "/help", label: "Help", position: "left" },
          {
            to: "/docs/support",
            label: "Support",
            position: "left",
          },
          {
            type: "localeDropdown",
            position: "right",
            className: "header-locale-link",
          },
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
        logo: {
          src: "logoDark.svg",
        },
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "User Showcases",
                href: "/users",
              },
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/gauzy",
              },
              {
                label: "Gitter Chat",
                href: "https://gitter.im/ever-co/gauzy",
              },
              {
                label: "Discord",
                href: "https://discord.com/invite/msqRJ4w",
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
                html: `
                <div class="widget"><a class="btn" href="https://github.com/ever-co/ever-gauzy" rel="noopener" target="_blank" aria-label="Star this project on GitHub"><svg viewBox="0 0 16 16" width="14" height="14" class="octicon octicon-star" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path></svg>&nbsp;<span>Star</span></a><a class="social-count" href="https://github.com/ever-co/ever-gauzy/stargazers" rel="noopener" target="_blank" aria-label="1530 stargazers on GitHub">1,530</a></div>`,
              },
            ],
          },
        ],
        copyright: `Copyright © 2023 Ever Co. LTD. <br/>This website was created with <img src="/img/docusaurus.svg"> Docusaurus.`,
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
        externalUrlRegex: "external\\.com|domain\\.com",

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
