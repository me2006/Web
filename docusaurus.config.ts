import {themes as prismThemes} from "prism-react-renderer";
import type {Config} from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Sitekick Remastered",
  favicon: "img/favicon.ico",
  url: "https://sitekickremastered.com/",
  baseUrl: "/",

  // Github Deployment and repo name
  organizationName: "SitekickRemastered",
  projectName: "SitekickWeb",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

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
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Remove this to get rid of the "Edit this page" button
          editUrl:  "https://github.com/sitekickremastered/Web/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Remove this to get rid of the "Edit this page" button
          editUrl: "https://github.com/sitekickremastered/Web/",

          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/social_card.png",
    navbar: {
      logo: {
        src: "img/logo.png",
        alt: "Sitekick Remastered Logo",
      },
      items: [
        { to: "/download", label: "Download", position: "left" },
        { to: "discord.sitekickremastered.com", label: "Discord", position: "left"},
        { to: "/games", label: "Games", position: "left" },
        { to: "/fanart", label: "Fan Art", position: "left"},
        { to: "/blog", label: "Blog", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "wikiSidebar",
          position: "left",
          label: "Wiki",
        },
        { to: "/contact", label: "Contact", position: "left"}
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
