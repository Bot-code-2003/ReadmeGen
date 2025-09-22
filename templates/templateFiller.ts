import { FormData } from "@/common/types";
import { techList } from "@/common/techstack";

export function fillTemplate(
  template: string,
  data: FormData,
  theme?: {
    id?: string;
    logoColor?: string;
    statsTheme?: string;
    trophyTheme?: string;
  }
): string {
  let filledTemplate = template;

  // 🎨 Theme → Badge Colors mapping
  const themeBadgeColors: Record<string, string[]> = {
    neon: ["39FF14", "FF073A", "00FFFF", "FF00FF", "FFFF00", "FF6600", "00FF7F"],
    medieval: ["8B4513", "8B0000", "B8860B", "556B2F", "6A5ACD", "483C32", "A52A2A"],
    pixel: [
      "2E2E3A", // deep slate background
      "1B1464", // midnight blue
      "6A0572", // neon purple
      "FF006E", // neon pink
      "00F5D4", // aqua cyan
      "FEE440", // retro yellow
      "FB5607", // orange glow
      "8338EC", // electric violet
      "3A86FF", // bright pixel blue
    ],
    default: ["999999"],
  };

  // Use the passed theme (fallback to default)
  const themeId = theme?.id || "default";
  const colors = themeBadgeColors[themeId] || themeBadgeColors.default;
  const logoColor = theme?.logoColor || "000000";

  console.log("👉 Theme ID:", themeId);
  console.log("👉 Using colors:", colors);
  console.log("👉 LogoColor:", logoColor);

  // --- Hero placeholders
  filledTemplate = filledTemplate.replace(/\{\{hero\.name\}\}/g, data.hero.name || "");
  filledTemplate = filledTemplate.replace(/\{\{hero\.tagline\}\}/g, data.hero.tagline || "");

  // --- About
  if (data.about && data.about.trim() !== "") {
    const aboutWithBreaks = data.about.replace(/\n/g, "<br/>");
    filledTemplate = filledTemplate.replace(/\{\{about\.content\}\}/g, aboutWithBreaks + "\n\n");
  } else {
    filledTemplate = filledTemplate.replace(/## 🌌 Who Am I\?[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 🎮 Player Profile[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 📜 The Tale of Me[\s\S]*?---/g, "");
  }

  // --- Stack badges
  if (data.stack && data.stack.length > 0) {
    const techBadges = data.stack
      .map((id, index) => {
        const found = techList.find((t) => t.id === id);
        if (!found) return "";
        const color = colors[index % colors.length];
        console.log("👉 Badge:", found.name, "Color:", color);
        return `<img src="https://img.shields.io/badge/${encodeURIComponent(
          found.name
        )}-${color}?style=for-the-badge&logo=${found.logo}&logoColor=${logoColor}"/>`;
      })
      .filter(Boolean)
      .join(" ");

    filledTemplate = filledTemplate.replace(/\{\{stack\.badges\}\}/g, techBadges);
  } else {
    filledTemplate = filledTemplate.replace(/## ⚡ My Neon Arsenal[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 🎛️ My Retro Gear[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## ⚔️ Weapons & Tools[\s\S]*?---/g, "");
  }

  // --- Hobbies
  if (data.hobbies && data.hobbies.trim() !== "") {
    const hobbiesWithBreaks = data.hobbies.replace(/\n/g, "<br/>");
    filledTemplate = filledTemplate.replace(/\{\{hobbies\.content\}\}/g, hobbiesWithBreaks);
  } else {
    filledTemplate = filledTemplate.replace(/## 🎮 Beyond the Matrix[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 🕹️ Beyond the Arcade[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 🏰 Beyond the Castle[\s\S]*?---/g, "");
  }

  // --- Stats & Trophies
  if (data.stats.github_username && data.stats.github_username.trim() !== "") {
    const statsTheme = theme?.statsTheme || "radical";
    const trophyTheme = theme?.trophyTheme || "onedark";

    if (data.stats.showStats) {
      const statsContent = `
  <a href="https://github.com/${data.stats.github_username}">
    <img width="60%" src="https://github-readme-stats.vercel.app/api?username=${data.stats.github_username}&theme=${statsTheme}" />
  </a>
  <a href="https://github.com/${data.stats.github_username}">
    <img width="60%" src="http://github-readme-streak-stats.herokuapp.com/?user=${data.stats.github_username}&theme=${statsTheme}&date_format=M%20j%5B%2C%20Y%5D&ring=ff3068&fire=ff3068&sideNums=ff3068" />
  </a>
  `;
      filledTemplate = filledTemplate.replace(/\{\{stats\.content\}\}/g, statsContent);
    } else {
      filledTemplate = filledTemplate.replace(/\{\{stats\.content\}\}/g, "");
      filledTemplate = filledTemplate.replace(/## 📊 Digital Footprints[\s\S]*?---/g, "");
      filledTemplate = filledTemplate.replace(/## 📟 Scoreboard[\s\S]*?---/g, "");
      filledTemplate = filledTemplate.replace(/## 🏰 Kingdom Records[\s\S]*?---/g, "");
    }

    if (data.stats.showTrophies) {
      const trophiesContent = `<img src="https://github-profile-trophy.vercel.app/?username=${data.stats.github_username}&theme=${trophyTheme}"/>\n\n`;
      filledTemplate = filledTemplate.replace(/\{\{trophies\.content\}\}/g, trophiesContent);
    } else {
      filledTemplate = filledTemplate.replace(/\{\{trophies\.content\}\}/g, "");
      filledTemplate = filledTemplate.replace(/## 🏆 Neon Trophies[\s\S]*?---/g, "");
      filledTemplate = filledTemplate.replace(/## 🏆 Game Over Trophies[\s\S]*?---/g, "");
      filledTemplate = filledTemplate.replace(/## 👑 Royal Trophies[\s\S]*?---/g, "");
    }
  } else {
    filledTemplate = filledTemplate.replace(/## 📊 Digital Footprints[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 📟 Scoreboard[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 🏰 Kingdom Records[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 🏆 Neon Trophies[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 🏆 Game Over Trophies[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 👑 Royal Trophies[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/\{\{stats\.content\}\}/g, "");
    filledTemplate = filledTemplate.replace(/\{\{trophies\.content\}\}/g, "");
  }

  // --- Socials
  const socialsEntries = Object.entries(data.socials || {}).filter(
    ([, url]) => url && url.trim() !== ""
  );
  if (socialsEntries.length > 0) {
    const socialsContent = socialsEntries
      .map(([platform, url]) => `- **${platform}**: ${url}`)
      .join("\n");
    filledTemplate = filledTemplate.replace(/\{\{socials\.content\}\}/g, socialsContent);
  } else {
    filledTemplate = filledTemplate.replace(/## 🔗 Connect with Me[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 🎯 Connect[\s\S]*?---/g, "");
    filledTemplate = filledTemplate.replace(/## 🗡️ Join My Quest[\s\S]*?---/g, "");
  }

  // --- Quote
  if (data.quote && data.quote.trim() !== "") {
    const quoteWithBreaks = data.quote.replace(/\n/g, "<br/>");
    filledTemplate = filledTemplate.replace(/\{\{quote\.content\}\}/g, quoteWithBreaks);
  } else {
    filledTemplate = filledTemplate.replace(/## 💬 Quote[\s\S]*?---/g, "");
  }

  // --- Cleanup
  filledTemplate = filledTemplate.replace(/\{\{[^}]+\}\}/g, "");
  filledTemplate = filledTemplate.replace(/\n\s*\n\s*\n/g, "\n\n");

  console.log("✅ Final template ready");
  return filledTemplate;
}
