export interface FormData {
  hero: {
    name: string;
    tagline: string;
    // optional derived value used by some templates (e.g. typing svg)
    name_encoded?: string;
  };
  about: string;
  stack: string[];
  hobbies: string;

  // Stats block
  stats: {
    showStats: boolean;
    showTrophies: boolean;
    github_username: string;
  };

  // Socials - required keys kept as strings (you can make these partial if desired)
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    website: string;
    // allow extra optional socials (instagram etc)
    instagram?: string;
    [key: string]: string | undefined;
  };

  quote: string;

  // NEW: appearance overrides the theme (optional)
  appearance?: {
    banner?: string;
    primary?: string; // hex color or string
  };

  // NEW: allow user to append arbitrary custom markdown
  custom_md?: string;

  // allow future optional fields without breaking existing drafts
  [k: string]: any;
}
