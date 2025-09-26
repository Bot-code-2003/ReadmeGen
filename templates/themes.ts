// themes.ts

export const themes = [
  {
    id: "pixel",
    name: "Pixel World Adventurer",
    banner: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif", // pixel sunset skyline
    logoColor: "000000",
    statsTheme: "tokyonight",
    trophyTheme: "retro",
    colors: ["FF0000", "00FF00", "FFFF00", "00FFFF", "FF00FF", "FFA500", "808080"],

    // --- simple keyword-driven order for dynamic form generation
    order: [
      "hero",
      "about",
      "stack",
      "socials",
      "stats",
      "end_quote",
      "appearance",
      "custom_md"
    ],

    // --- small presets used to seed quick form or demo preview
    presets: {
      hero: { name: "Pixel Player", tagline: "8-bit tinkerer & dev" },
      about:
        "I build tiny worlds in code and big ideas in my head.\nCollector of retro sprites, coffee, and curiosities.",
      stack: ["react", "javascript", "python"],
      socials: { github: "your-username", twitter: "your-handle", website: "example.com" },
      stats: { github_username: "your-username", showStats: true, showTrophies: false },
      quote: "Thanks for playing — press Start to continue."
    },

    // --- tiny form meta (keeps it simple; used for mini-form / quickFields)
    formMeta: {
      version: "1.0",
      quickFields: ["hero.name", "hero.tagline", "socials.github"]
    },

    markdownTemplate: `
  <div align="center">
  
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjI0ejBkOXB2Z3NvODV2eGR4OTF0NXFldTUzcWZydG9jcXV5MTdncyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/k81NasbqkKA5HSyJxN/giphy.gif" width="80%" alt="pixel-world-banner"/>
  
  <h1>
    🕹️ {{hero.name}} 🕹️
  </h1>
  
  <p>
    <em>
      {{hero.tagline}}
    </em>
  </p>
  
  <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b3JnNDd0Ymo0a2Z6emRucmoxbnplbzY3MmxuMzl3YWNjcXY3ZHV0NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/H7gdwW1UOWyRlVYpwt/giphy.gif" width="100" alt="pixel-hero"/>
  </div>
  
  ---
  
  ## 📜 Player Log
  
  {{about.content}}
  
  ---
  
  ## 🎒 Inventory
  <p align="center">
    {{stack.badges}}
  </p>
  
  ---
  
  ## 🏰 Guild Links
  {{socials.content}}
  
  ---
  
  ## 🏆 High Score
  
  <img align="right" width="35%" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjI0ejBkOXB2Z3NvODV2eGR4OTF0NXFldTUzcWZydG9jcXV5MTdncyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lkceXNDw4Agryfrwz8/giphy.gif" alt="pixel-trophy"/>
  
<div align="left"> {{stats.content}}  </div>
  
  ---
  
<div align="center">

<table>
<tr>
<td width="150">
  <img src="https://media.giphy.com/media/GkD4U3VfiIbzcBhQNu/giphy.gif" width="100" alt="pixel-fire-left"/>
</td>
<td align="center">
  <h3>► THANKS FOR PLAYING ◄</h3>
</td>
<td width="150">
  <img src="https://media.giphy.com/media/gx54W1mSpeYMg/giphy.gif" width="100" alt="pixel-fire-right"/>
</td>
</tr>
</table>

</div>
    `,
  },
  {
    id: "neon",
    name: "dark neon",
    banner: "https://media.giphy.com/media/HBfPnndsh9MpG/giphy.gif",
    logoColor: "000000",
    statsTheme: "radical",
    trophyTheme: "onedark",
    colors: ["39FF14", "FF073A", "00FFFF", "FF00FF", "FFFF00", "FF6600", "00FF7F"],

    order: [
      "hero",
      "about",
      "stack",
      "hobbies",
      "stats",
      "trophies",
      "socials",
      "end_quote",
      "appearance",
      "custom_md"
    ],

    presets: {
      hero: { name: "Neon Coder", tagline: "Cyberpunk tinkerer" },
      about:
        "I chase clean code and bright pixels. Coffee-fueled, late-night builder. I love generative art and synthwave.",
      stack: ["react", "nextjs", "tensorflow"],
      hobbies: "Synthwave playlists\nPixel art\nCaffeine experiments",
      socials: { github: "neon-dev", twitter: "neon_handle" },
      stats: { github_username: "neon-dev", showStats: true, showTrophies: true },
      quote: "⚡ Code. Create. Escape. Repeat. ⚡"
    },

    formMeta: {
      version: "1.0",
      quickFields: ["hero.name", "hero.tagline", "socials.github"]
    },

    markdownTemplate: `
<div align="center">

<p><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&duration=4000&pause=1000&color=39FF14&center=true&vCenter=true&width=600&lines=⚡+{{hero.name_encoded}}+⚡;Cyber+Punk+Geek;" alt="Typing SVG" /></p>

<pre align="center" style="color:#39ff14;">
██████╗ ██╗  ██╗ █████╗ ██████╗ ███╗   ███╗
██╔══██╗██║  ██║██╔══██╗██╔══██╗████╗ ████║
██████╔╝███████║███████║██████╔╝██╔████╔██║
██╔═══╝ ██╔══██║██╔══██║██╔═══╝ ██║╚██╔╝██║
██║     ██║  ██║██║  ██║██║     ██║ ╚═╝ ██║
╚═╝     ╚╝  ╚╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝
</pre>

<p>
  <em style="color:#00e6e6;">
    {{hero.tagline}}
  </em>
</p>

<img src="https://media.giphy.com/media/HBfPnndsh9MpG/giphy.gif" width="400" alt="neon terminal"/>

</div>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%"/>

## 🌌 Who Am I?

{{about.content}}
## ⚡ My Neon Arsenal  

<p align="center">
  {{stack.badges}}
</p>

## 🎮 Beyond the Matrix  

{{hobbies.content}}
## 📊 Digital Footprints  
<div align="center">
{{stats.content}}
</div>
## 🏆 Neon Trophies  

{{trophies.content}}
## 🔗 Connect with Me  

{{socials.content}}
<p align="center">
  <img src="https://github.com/Platane/snk/raw/output/github-contribution-grid-snake.svg" alt="snake gif"/>
</p>

<div align="center">

<img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cDVoaHFqZGl2bDljN25tc3p2ZG1uZTFzeXJiaW90cmozNzhhNGNoMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jow0htwvROxzepF0UZ/giphy.gif" width="100%" alt="cyberpunk gif"/>

<h3 style="color:#ff00ff;">
  ⬢ Code ⬢ Create ⬢ Escape ⬢ Repeat ⬢
</h3>

</div>
`,
  },
  {
    id: "medieval-artisan",
    name: "medieval scroll",
    banner: "https://media.giphy.com/media/5biVE87F1MER4UHfGY/giphy.gif",
    logoColor: "000000",
    statsTheme: "gruvbox",
    trophyTheme: "chalk",
    colors: ["8B4513", "8B0000", "B8860B", "556B2F", "6A5ACD", "483C32", "A52A2A"],

    order: [
      "hero",
      "about",
      "stack",
      "hobbies",
      "stats",
      "socials",
      "appearance",
      "custom_md"
    ],

    presets: {
      hero: { name: "The Artisan", tagline: "Scribe of code & craft" },
      about:
        "A wandering craftsman of projects and pixels. I delight in elegant designs, readable commits, and strong tea.",
      stack: ["rust", "go", "python"],
      hobbies: "Calligraphy\nHistorical fiction\nCrafting",
      socials: { github: "artisan-dev", website: "artisan.example" },
      stats: { github_username: "artisan-dev", showStats: true, showTrophies: false },
      quote: "May your commits be clean and your builds swift."
    },

    formMeta: {
      version: "1.0",
      quickFields: ["hero.name", "hero.tagline", "socials.github"]
    },

    markdownTemplate: "<div align=\"center\">\n  <img src=\"https://media.giphy.com/media/5biVE87F1MER4UHfGY/giphy.gif\" width=\"100%\" alt=\"castle-banner\"/>\n\n  <h1>\n    <img src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXBtbnZ4N2MyMTFtczlwdTN3YzA1ZHJ2Zng3aGF3OG4xbjNnazBzMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/142UUuhYoZqlG/giphy.gif\" width=\"50\" alt=\"crown\"/>\n    The Chronicle of {{hero.name}}\n    <img src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXBtbnZ4N2MyMTFtczlwdTN3YzA1ZHJ2Zng3aGF3OG4xbjNnazBzMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/142UUuhYoZqlG/giphy.gif\" width=\"50\" alt=\"crown\"/>\n  </h1>\n  <p><em>\"{{hero.tagline}}\"</em></p>\n</div>\n\n---\n\n### 📜 From the Royal Scribe\n> _Hear ye, hear ye! The following pages document the valiant deeds and noble pursuits of our most esteemed artisan._\n<br>\n{{about.content}}\n\n---\n\n<br>\n\n| | |\n| :--- | :--- |\n| <img align=\"right\" width=\"150\" src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc1MGtycG9jNmJkdTV0Y3prZWJiYjA1ejM2c2p6czFhYWIxYTgwOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TNb3Ihssb6T5FpcdOY/giphy.gif\" alt=\"sword-and-shield\"/> | ⚔️ The Artisan's Toolkit<br> <div align=\"left\">{{stack.badges}}</div> |\n| <img align=\"right\" width=\"150\" src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzFkNHBqNmdwZzZ0bDExYzh1NDA3MXN2azAycHkxMGkxMmRmNW0ydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11dzD6gWgmR8Qg/giphy.gif\" alt=\"quill-and-ink\"/> | 🖋️ A Poet's Pastimes<br> <div align=\"left\">{{hobbies.content}}</div> |\n\n<br>\n\n---\n\n### 📊 The Grand Ledger\n<div align=\"center\">\n  <p>_A record of the scribe's dedication, penned with every commit._</p>\n  <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3aRz2gfH1AXGA23CsN3zwS2HV6CVGHJ_YQQ&s\" align=\"right\" width=\"250\" alt=\"ledger-book-art\"/>\n</div>\n<br>\n{{stats.content}}\n<br>\n<br>\n\n---\n\n### 👑 Hall of Triumphs\n> _These decrees were earned through feats of skill and perseverance._\n<div align=\"center\">\n  {{trophies.content}}\n\n</div>\n\n---\n\n### 🤝 The King's Messengers\n_Dispatching the latest news and connecting with fellow guilds._\n<br>\n{{socials.content}}\n<br>\n\n---\n\n<div align=\"center\">\n  <img src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnM5bWZoOTc0NWZhczk3ZjEzNXl0eXU2ajRkdGcwOW83aTZ0aGR2aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bHSkKRvkRvy5chUBBp/giphy.gif\" width=\"300\" alt=\"knight-footer\"/>\n  <p>_May your code be noble and your fortress secure._</p>\n</div>"
  }
];
