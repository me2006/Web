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
          showReadingTime: false,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',

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
    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      logo: {
        src: "img/logo.svg",
        alt: "Sitekick Remastered Logo",
      },
      items: [
        { to: "/download", label: "Download", position: "left" },
        { to: "https://discord.sitekickremastered.com", label: "Discord", position: "left"},
        { to: "/fanart", label: "Fan Art", position: "left"},
        { to: "/blog", label: "Blog", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "wikiSidebar",
          position: "left",
          label: "Wiki",
        },
        { to: "/contact", label: "Contact Us", position: "left"}
        /*
        { to: "/games", label: "Games", position: "left" },
        { to: "/metrics", label: "Metrics", position: "left"},
        { to: "/status", label: "Status", position: "left"},
        */
      ],
    },

    footer: {
      style: "dark",
      logo: {
        src: 'img/logo.svg',
        alt: 'Sitekick Remastered Logo',
        href: 'https://sitekickremastered.com',
        className: 'footer__logo',
      },
      links: [ 
        { label: 'Home', href: '/' },
        { label: 'Download', href: '/download' },
        { label: 'Fan Art', href: '/fanart' },
        { label: "Blog", href: "/blog" },
        { label: "Wiki", href: "/wiki" },
        { label: "Metrics", href: "/metrics"},
        { label: "Status", href: "/status"},

        { label: "Privacy Policy", href: "/legal/privacy"},
        { label: "Terms of Service", href: "/legal/tos"},
        { label: "Cookies Policy", href: "/legal/cookies"},
        { label: "Rules", href: "/docs/rules"},
        
        { label: "Join The Team", href: "/docs/development/join_the_team"},
        { label: "Contact Us", href: "/contact"},
      ],
      copyright: `Sitekick Remastered is in no way affiliated with YTV Canada, Inc. and/or Corus Entertainment, Inc. <br/>
                  Sitekick Remastered is a completely free game, containing no advertisements, subscriptions, microtransactions,
                  or any other form of monetization.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
