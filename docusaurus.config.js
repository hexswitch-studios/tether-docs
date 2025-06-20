// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Haven docs",
  tagline: "Documentation and general guides for the Haven theme on Shopify.",
  favicon: "img/favicon.ico",

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        href: "img/favicon-light.svg",
        type: "image/svg+xml",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        href: "img/favicon-dark.svg",
        type: "image/svg+xml",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
      },
    },
  ],

  // Set the production url of your site here
  url: "http://hexswitch-studios.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "hexswitch-studios", // Usually your GitHub org/user name.
  projectName: "tether-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Haven theme",
        logo: {
          alt: "Hex Switch Studios logo",
          src: "img/logo-dark.svg",
          srcDark: "img/logo-light.svg",
        },
        items: [
          {
            to: "/category/getting-started",
            label: "Getting started",
            position: "left",
          },
          {
            to: "/category/theme-settings",
            label: "Theme settings",
            position: "left",
          },
          {
            to: "/category/sections",
            label: "Sections",
            position: "left",
          },
          {
            to: "/category/blocks",
            label: "Blocks",
            position: "left",
          },
          {
            to: "/contact",
            label: "Contact us",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        logo: {
          alt: "Hex Switch logo",
          src: "img/logo-dark.svg",
          srcDark: "img/logo-light.svg",
          href: "https://hexswitch.com",
          height: 50,
        },
        copyright: `Copyright © ${new Date().getFullYear()} Hex witch Studios.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
