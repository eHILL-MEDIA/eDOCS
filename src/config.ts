import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://docs.ehill.de/",
  author: "eHILL MEDIA",
  desc: "eDOCS - IT, Server & Netzwerkdokumentationen einfach erklärt.",
  title: "eDOCS",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000,
};

export const NAV_ITEMS = [
  {
    href: "/partner/",
    linkText: "Partner",
  },
  {
    href: "/about/",
    linkText: "Über mich",
  },
];

export const LOCALE = {
  lang: "de",
  langTag: ["de-DE"], 
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/eHILL-MEDIA/eDOCS",
    linkTitle: ` ${SITE.title} auf GitHub`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:mail@tohill.de",
    linkTitle: `E-Mail an ${SITE.author}`,
    active: true,
  }
];
