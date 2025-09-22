export interface FormData {
  hero: {
    name: string;
    tagline: string;
  };
  about: string;
  stack: string[];
  hobbies: string;
  stats: {
    showStats: boolean;
    showTrophies: boolean;
    github_username: string;
  };
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    website: string;
  };
  quote: string;
}