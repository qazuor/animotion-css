import { Play } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { BuyMeACoffeeIcon, FiverrIcon, GithubIcon, LinkedinIcon, UpworkIcon } from "@/icons";

/**
 * Site Configuration
 *
 * This file contains all the configurable values for the site.
 * When creating a new project from this template, update these values.
 */

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface SocialLink {
  name: string;
  url: string;
  icon: IconComponent;
}

export interface FreelanceLink {
  name: string;
  url: string;
  icon?: IconComponent;
}

export interface SiteConfig {
  // App info (used in Header, meta tags, etc.)
  app: {
    name: string;
    description: string;
    // Icon component for the app (from lucide-react)
    icon: IconComponent;
  };

  // Author info (used in Header, Footer)
  author: {
    name: string;
    url: string;
    location: string;
  };

  // Social links (used in Footer)
  socialLinks: SocialLink[];

  // Freelance platform links (used in Footer)
  freelanceLinks: FreelanceLink[];

  // Tech stack shown in Footer
  techStack: string[];
  // Reduced tech stack for mobile
  mobileTechStack: string[];

  // Storage keys (for localStorage)
  storage: {
    language: string;
    theme: string;
    // Add more keys as needed for your project
    [key: string]: string;
  };

  // Available languages
  languages: {
    code: string;
    name: string;
    flag: string;
  }[];
}

/**
 * Default site configuration
 * Modify these values for your project
 */
export const siteConfig: SiteConfig = {
  app: {
    name: "Animotion CSS",
    description: "CSS Animation Generator",
    icon: Play,
  },

  author: {
    name: "qazuor",
    url: "https://qazuor.com",
    location: "Entre Rios, Argentina",
  },

  socialLinks: [
    { name: "GitHub", url: "https://github.com/qazuor", icon: GithubIcon },
    { name: "LinkedIn", url: "https://linkedin.com/in/qazuor", icon: LinkedinIcon },
    { name: "Buy me a coffee", url: "https://buymeacoffee.com/qazuor", icon: BuyMeACoffeeIcon },
  ],

  freelanceLinks: [
    { name: "Fiverr", url: "https://www.fiverr.com/sellers/leandroasrilevi/", icon: FiverrIcon },
    {
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/~01881c38344e9431d7",
      icon: UpworkIcon,
    },
  ],

  techStack: ["React", "TypeScript", "Tailwind", "shadcn/ui", "Zustand", "Vite"],
  mobileTechStack: ["React", "TypeScript", "Tailwind"],

  storage: {
    language: "animotion-language",
    theme: "animotion-theme",
    history: "animotion-history",
  },

  languages: [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ],
};
