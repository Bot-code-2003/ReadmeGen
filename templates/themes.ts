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
      quote: "Thanks for playing — press Start to continue.",
      end_quote: { content: "Thanks for playing — press Start to continue." }
    },

    // --- comprehensive form metadata for dynamic form generation
    formMeta: {
      version: "2.0",
      sections: [
        {
          id: "hero",
          title: "Hero Section",
          description: "Your main introduction and tagline",
          fields: [
            {
              id: "name",
              label: "Your Name",
              type: "text",
              placeholder: "Enter your name",
              required: true,
              maxLength: 50
            },
            {
              id: "tagline",
              label: "Tagline",
              type: "text",
              placeholder: "Brief description of what you do",
              required: true,
              maxLength: 100
            }
          ]
        },
        {
          id: "about",
          title: "About You",
          description: "Tell your story",
          fields: [
            {
              id: "content",
              label: "About Description",
              type: "textarea",
              placeholder: "Write a few sentences about yourself...",
              required: true,
              rows: 4,
              maxLength: 500
            }
          ]
        },
        {
          id: "stack",
          title: "Tech Stack",
          description: "Your technical skills and tools",
          fields: [
            {
              id: "technologies",
              label: "Technologies",
              type: "multiselect",
              placeholder: "Select your technologies",
              required: true,
              options: ["react", "javascript", "python", "nodejs", "typescript", "nextjs", "vue", "angular", "java", "csharp", "go", "rust", "php", "ruby", "swift", "kotlin", "flutter", "dart", "html", "css", "sass", "tailwind", "bootstrap", "mongodb", "postgresql", "mysql", "redis", "docker", "kubernetes", "aws", "azure", "gcp", "git", "github", "gitlab", "figma", "photoshop"]
            }
          ]
        },
        {
          id: "socials",
          title: "Social Links",
          description: "Your online presence",
          fields: [
            {
              id: "github",
              label: "GitHub Username",
              type: "text",
              placeholder: "your-username",
              required: true
            },
            {
              id: "twitter",
              label: "Twitter Handle",
              type: "text",
              placeholder: "your-handle",
              required: false
            },
            {
              id: "linkedin",
              label: "LinkedIn Username",
              type: "text",
              placeholder: "your-linkedin",
              required: false
            },
            {
              id: "website",
              label: "Personal Website",
              type: "url",
              placeholder: "https://yoursite.com",
              required: false
            }
          ]
        },
        {
          id: "stats",
          title: "GitHub Stats",
          description: "Display your GitHub statistics",
          fields: [
            {
              id: "github_username",
              label: "GitHub Username",
              type: "text",
              placeholder: "your-username",
              required: true
            },
            {
              id: "showStats",
              label: "Show GitHub Stats",
              type: "checkbox",
              defaultValue: true
            },
            {
              id: "showTrophies",
              label: "Show GitHub Trophies",
              type: "checkbox",
              defaultValue: false
            }
          ]
        },
        {
          id: "end_quote",
          title: "Closing Quote",
          description: "End with a memorable message",
          fields: [
            {
              id: "content",
              label: "Closing Message",
              type: "text",
              placeholder: "Your closing message...",
              required: false,
              maxLength: 150
            }
          ]
        }
      ]
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
  <h3>► {{end_quote.content}} ◄</h3>
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
      quote: "⚡ Code. Create. Escape. Repeat. ⚡",
      end_quote: { content: "Code ⬢ Create ⬢ Escape ⬢ Repeat" }
    },

    formMeta: {
      version: "2.0",
      sections: [
        {
          id: "hero",
          title: "Hero Section",
          description: "Your cyberpunk identity",
          fields: [
            {
              id: "name",
              label: "Your Name",
              type: "text",
              placeholder: "Enter your name",
              required: true,
              maxLength: 50
            },
            {
              id: "tagline",
              label: "Tagline",
              type: "text",
              placeholder: "Your cyberpunk description",
              required: true,
              maxLength: 100
            }
          ]
        },
        {
          id: "about",
          title: "About You",
          description: "Your digital story",
          fields: [
            {
              id: "content",
              label: "About Description",
              type: "textarea",
              placeholder: "Tell your cyberpunk story...",
              required: true,
              rows: 4,
              maxLength: 500
            }
          ]
        },
        {
          id: "stack",
          title: "Tech Arsenal",
          description: "Your digital weapons of choice",
          fields: [
            {
              id: "technologies",
              label: "Technologies",
              type: "multiselect",
              placeholder: "Select your tech stack",
              required: true,
              options: ["react", "javascript", "python", "nodejs", "typescript", "nextjs", "vue", "angular", "java", "csharp", "go", "rust", "php", "ruby", "swift", "kotlin", "flutter", "dart", "html", "css", "sass", "tailwind", "bootstrap", "mongodb", "postgresql", "mysql", "redis", "docker", "kubernetes", "aws", "azure", "gcp", "git", "github", "gitlab", "figma", "photoshop", "tensorflow", "pytorch"]
            }
          ]
        },
        {
          id: "hobbies",
          title: "Beyond the Matrix",
          description: "What you do when not coding",
          fields: [
            {
              id: "content",
              label: "Hobbies & Interests",
              type: "textarea",
              placeholder: "Your interests beyond code...",
              required: false,
              rows: 3,
              maxLength: 300
            }
          ]
        },
        {
          id: "socials",
          title: "Digital Connections",
          description: "Your online presence",
          fields: [
            {
              id: "github",
              label: "GitHub Username",
              type: "text",
              placeholder: "your-username",
              required: true
            },
            {
              id: "twitter",
              label: "Twitter Handle",
              type: "text",
              placeholder: "your-handle",
              required: false
            },
            {
              id: "linkedin",
              label: "LinkedIn Username",
              type: "text",
              placeholder: "your-linkedin",
              required: false
            },
            {
              id: "website",
              label: "Personal Website",
              type: "url",
              placeholder: "https://yoursite.com",
              required: false
            }
          ]
        },
        {
          id: "stats",
          title: "Digital Footprint",
          description: "Your GitHub statistics",
          fields: [
            {
              id: "github_username",
              label: "GitHub Username",
              type: "text",
              placeholder: "your-username",
              required: true
            },
            {
              id: "showStats",
              label: "Show GitHub Stats",
              type: "checkbox",
              defaultValue: true
            },
            {
              id: "showTrophies",
              label: "Show GitHub Trophies",
              type: "checkbox",
              defaultValue: true
            }
          ]
        },
        {
          id: "end_quote",
          title: "Exit Message",
          description: "Your final cyberpunk statement",
          fields: [
            {
              id: "content",
              label: "Closing Message",
              type: "text",
              placeholder: "Your exit message...",
              required: false,
              maxLength: 150
            }
          ]
        }
      ]
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
  ⬢ {{end_quote.content}} ⬢
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
      "end_quote",
      "appearance",
      "custom_md"
    ],

    presets: {
      hero: { name: "The Artisan", tagline: "Scribe of code & craft" },
      about: { content: "A wandering craftsman of projects and pixels. I delight in elegant designs, readable commits, and strong tea." },
      stack: { technologies: ["rust", "go", "python"] },
      hobbies: { content: "Calligraphy\nHistorical fiction\nCrafting" },
      socials: { github: "artisan-dev", website: "artisan.example" },
      stats: { github_username: "artisan-dev", showStats: true, showTrophies: false },
      quote: "May your commits be clean and your builds swift.",
      end_quote: { content: "May your code be noble and your fortress secure." }
    },

    formMeta: {
      version: "2.0",
      sections: [
        {
          id: "hero",
          title: "Noble Identity",
          description: "Your royal title and calling",
          fields: [
            {
              id: "name",
              label: "Your Name",
              type: "text",
              placeholder: "Enter your noble name",
              required: true,
              maxLength: 50
            },
            {
              id: "tagline",
              label: "Your Calling",
              type: "text",
              placeholder: "Your craft and expertise",
              required: true,
              maxLength: 100
            }
          ]
        },
        {
          id: "about",
          title: "Your Chronicle",
          description: "Tell your tale",
          fields: [
            {
              id: "content",
              label: "About You",
              type: "textarea",
              placeholder: "Share your story and journey...",
              required: true,
              rows: 4,
              maxLength: 500
            }
          ]
        },
        {
          id: "stack",
          title: "Artisan's Toolkit",
          description: "Your tools and skills",
          fields: [
            {
              id: "technologies",
              label: "Technologies",
              type: "multiselect",
              placeholder: "Select your tools",
              required: true,
              options: ["rust", "go", "python", "javascript", "typescript", "java", "csharp", "php", "ruby", "swift", "kotlin", "html", "css", "react", "vue", "angular", "nodejs", "docker", "kubernetes", "git", "github"]
            }
          ]
        },
        {
          id: "hobbies",
          title: "Noble Pursuits",
          description: "Your interests beyond craft",
          fields: [
            {
              id: "content",
              label: "Hobbies & Interests",
              type: "textarea",
              placeholder: "Your pastimes and interests...",
              required: false,
              rows: 3,
              maxLength: 300
            }
          ]
        },
        {
          id: "stats",
          title: "The Grand Ledger",
          description: "Your achievements and records",
          fields: [
            {
              id: "github_username",
              label: "GitHub Username",
              type: "text",
              placeholder: "your-username",
              required: true
            },
            {
              id: "showStats",
              label: "Show GitHub Stats",
              type: "checkbox",
              defaultValue: true
            },
            {
              id: "showTrophies",
              label: "Show GitHub Trophies",
              type: "checkbox",
              defaultValue: false
            }
          ]
        },
        {
          id: "socials",
          title: "Royal Connections",
          description: "Your digital presence",
          fields: [
            {
              id: "github",
              label: "GitHub Username",
              type: "text",
              placeholder: "your-username",
              required: true
            },
            {
              id: "website",
              label: "Personal Website",
              type: "url",
              placeholder: "https://yoursite.com",
              required: false
            }
          ]
        },
        {
          id: "end_quote",
          title: "Royal Blessing",
          description: "Your final noble message",
          fields: [
            {
              id: "content",
              label: "Closing Blessing",
              type: "text",
              placeholder: "Your royal closing message...",
              required: false,
              maxLength: 150
            }
          ]
        }
      ]
    },

    markdownTemplate: "<div align=\"center\">\n  <img src=\"https://media.giphy.com/media/5biVE87F1MER4UHfGY/giphy.gif\" width=\"100%\" alt=\"castle-banner\"/>\n\n  <h1>\n    <img src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXBtbnZ4N2MyMTFtczlwdTN3YzA1ZHJ2Zng3aGF3OG4xbjNnazBzMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/142UUuhYoZqlG/giphy.gif\" width=\"50\" alt=\"crown\"/>\n    The Chronicle of {{hero.name}}\n    <img src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXBtbnZ4N2MyMTFtczlwdTN3YzA1ZHJ2Zng3aGF3OG4xbjNnazBzMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/142UUuhYoZqlG/giphy.gif\" width=\"50\" alt=\"crown\"/>\n  </h1>\n  <p><em>\"{{hero.tagline}}\"</em></p>\n</div>\n\n---\n\n### 📜 From the Royal Scribe\n> _Hear ye, hear ye! The following pages document the valiant deeds and noble pursuits of our most esteemed artisan._\n<br>\n{{about.content}}\n\n---\n\n<br>\n\n| | |\n| :--- | :--- |\n| <img align=\"right\" width=\"150\" src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc1MGtycG9jNmJkdTV0Y3prZWJiYjA1ejM2c2p6czFhYWIxYTgwOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TNb3Ihssb6T5FpcdOY/giphy.gif\" alt=\"sword-and-shield\"/> | ⚔️ The Artisan's Toolkit<br> <div align=\"left\">{{stack.badges}}</div> |\n| <img align=\"right\" width=\"150\" src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzFkNHBqNmdwZzZ0bDExYzh1NDA3MXN2azAycHkxMGkxMmRmNW0ydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11dzD6gWgmR8Qg/giphy.gif\" alt=\"quill-and-ink\"/> | 🖋️ A Poet's Pastimes<br> <div align=\"left\">{{hobbies.content}}</div> |\n\n<br>\n\n---\n\n### 📊 The Grand Ledger\n<div align=\"center\">\n  <p>_A record of the scribe's dedication, penned with every commit._</p>\n  <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3aRz2gfH1AXGA23CsN3zwS2HV6CVGHJ_YQQ&s\" align=\"right\" width=\"250\" alt=\"ledger-book-art\"/>\n</div>\n<br>\n{{stats.content}}\n<br>\n<br>\n\n---\n\n### 👑 Hall of Triumphs\n> _These decrees were earned through feats of skill and perseverance._\n<div align=\"center\">\n  {{trophies.content}}\n\n</div>\n\n---\n\n### 🤝 The King's Messengers\n_Dispatching the latest news and connecting with fellow guilds._\n<br>\n{{socials.content}}\n<br>\n\n---\n\n<div align=\"center\">\n  <img src=\"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnM5bWZoOTc0NWZhczk3ZjEzNXl0eXU2ajRkdGcwOW83aTZ0aGR2aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bHSkKRvkRvy5chUBBp/giphy.gif\" width=\"300\" alt=\"knight-footer\"/>\n  <p>_{{end_quote.content}}_</p>\n</div>"
  },
  {
    id: "minimalist",
    name: "Minimalist Pro",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    logoColor: "2D3748",
    statsTheme: "default",
    trophyTheme: "flat",
    colors: ["2D3748", "4A5568", "718096", "A0AEC0", "CBD5E0", "E2E8F0"],

    order: ["hero", "about", "stack", "stats", "socials", "end_quote"],

    presets: {
      hero: { name: "Alex Chen", tagline: "Clean Code Advocate" },
      about: { content: "I believe in the power of simplicity. Writing clean, maintainable code that speaks for itself. Less is more." },
      stack: { technologies: ["typescript", "react", "nodejs", "postgresql"] },
      socials: { github: "alexchen", linkedin: "alex-chen-dev", website: "alexchen.dev" },
      stats: { github_username: "alexchen", showStats: true, showTrophies: false },
      end_quote: { content: "Simplicity is the ultimate sophistication." }
    },

    formMeta: {
      version: "2.0",
      sections: [
        {
          id: "hero",
          title: "Identity",
          description: "Your professional identity",
          fields: [
            {
              id: "name",
              label: "Full Name",
              type: "text",
              placeholder: "Your name",
              required: true,
              maxLength: 50
            },
            {
              id: "tagline",
              label: "Professional Title",
              type: "text",
              placeholder: "What you do",
              required: true,
              maxLength: 80
            }
          ]
        },
        {
          id: "about",
          title: "About",
          description: "Your story in brief",
          fields: [
            {
              id: "content",
              label: "About You",
              type: "textarea",
              placeholder: "Tell your story concisely...",
              required: true,
              rows: 3,
              maxLength: 200
            }
          ]
        },
        {
          id: "stack",
          title: "Tech Stack",
          description: "Your core technologies",
          fields: [
            {
              id: "technologies",
              label: "Technologies",
              type: "multiselect",
              placeholder: "Select your main technologies",
              required: true,
              options: ["typescript", "javascript", "react", "vue", "angular", "nodejs", "python", "java", "go", "rust", "postgresql", "mongodb", "redis", "docker", "kubernetes", "aws", "gcp", "azure"]
            }
          ]
        },
        {
          id: "stats",
          title: "GitHub Stats",
          description: "Your development metrics",
          fields: [
            {
              id: "github_username",
              label: "GitHub Username",
              type: "text",
              placeholder: "your-username",
              required: true
            },
            {
              id: "showStats",
              label: "Show GitHub Stats",
              type: "checkbox",
              defaultValue: true
            }
          ]
        },
        {
          id: "socials",
          title: "Connect",
          description: "How to reach you",
          fields: [
            {
              id: "github",
              label: "GitHub",
              type: "text",
              placeholder: "username",
              required: true
            },
            {
              id: "linkedin",
              label: "LinkedIn",
              type: "text",
              placeholder: "profile-url",
              required: false
            },
            {
              id: "website",
              label: "Website",
              type: "url",
              placeholder: "https://yoursite.com",
              required: false
            }
          ]
        },
        {
          id: "end_quote",
          title: "Philosophy",
          description: "Your guiding principle",
          fields: [
            {
              id: "content",
              label: "Personal Philosophy",
              type: "text",
              placeholder: "Your guiding principle...",
              required: false,
              maxLength: 100
            }
          ]
        }
      ]
    },

    markdownTemplate: `
<div align="center">

# {{hero.name}}

**{{hero.tagline}}**

---

</div>

## About

{{about.content}}

## Tech Stack

<div align="center">

{{stack.badges}}

</div>

## GitHub Stats

<div align="center">

{{stats.content}}

</div>

## Connect

{{socials.content}}

---

<div align="center">

*{{end_quote.content}}*

</div>
    `
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    banner: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
    logoColor: "667EEA",
    statsTheme: "tokyonight",
    trophyTheme: "discord",
    colors: ["667EEA", "764BA2", "F093FB", "F5576C", "4FACFE", "00F2FE"],

    order: ["hero", "about", "stack", "socials", "stats", "end_quote"],

    presets: {
      hero: { name: "Jordan Blake", tagline: "Frontend Architect & Design Systems Expert" },
      about: { content: "Crafting beautiful, accessible user experiences with modern web technologies. Passionate about design systems, performance, and creating delightful digital products." },
      stack: { technologies: ["react", "typescript", "nextjs", "tailwind", "figma", "framer"] },
      socials: { github: "jordanblake", twitter: "jordan_codes", website: "jordanblake.design" },
      stats: { github_username: "jordanblake", showStats: true, showTrophies: true },
      end_quote: { content: "Design is not just what it looks like — design is how it works." }
    },

    formMeta: {
      version: "2.0",
      sections: [
        {
          id: "hero",
          title: "Your Brand",
          description: "Your professional brand identity",
          fields: [
            {
              id: "name",
              label: "Your Name",
              type: "text",
              placeholder: "Enter your name",
              required: true,
              maxLength: 50
            },
            {
              id: "tagline",
              label: "Professional Title",
              type: "text",
              placeholder: "Your role & expertise",
              required: true,
              maxLength: 120
            }
          ]
        },
        {
          id: "about",
          title: "Your Story",
          description: "What drives you as a creator",
          fields: [
            {
              id: "content",
              label: "About You",
              type: "textarea",
              placeholder: "Share your passion and expertise...",
              required: true,
              rows: 4,
              maxLength: 400
            }
          ]
        },
        {
          id: "stack",
          title: "Toolkit",
          description: "Your creative and technical tools",
          fields: [
            {
              id: "technologies",
              label: "Technologies & Tools",
              type: "multiselect",
              placeholder: "Select your toolkit",
              required: true,
              options: ["react", "vue", "angular", "typescript", "javascript", "nextjs", "nuxtjs", "tailwind", "sass", "figma", "sketch", "framer", "webflow", "nodejs", "python", "graphql", "prisma", "supabase", "vercel", "netlify"]
            }
          ]
        },
        {
          id: "socials",
          title: "Connect",
          description: "Your digital presence",
          fields: [
            {
              id: "github",
              label: "GitHub",
              type: "text",
              placeholder: "username",
              required: true
            },
            {
              id: "twitter",
              label: "Twitter",
              type: "text",
              placeholder: "handle",
              required: false
            },
            {
              id: "website",
              label: "Portfolio",
              type: "url",
              placeholder: "https://yourportfolio.com",
              required: false
            }
          ]
        },
        {
          id: "stats",
          title: "Metrics",
          description: "Your development activity",
          fields: [
            {
              id: "github_username",
              label: "GitHub Username",
              type: "text",
              placeholder: "username",
              required: true
            },
            {
              id: "showStats",
              label: "Show GitHub Stats",
              type: "checkbox",
              defaultValue: true
            },
            {
              id: "showTrophies",
              label: "Show Achievements",
              type: "checkbox",
              defaultValue: true
            }
          ]
        },
        {
          id: "end_quote",
          title: "Inspiration",
          description: "Your creative philosophy",
          fields: [
            {
              id: "content",
              label: "Inspirational Quote",
              type: "text",
              placeholder: "What inspires your work...",
              required: false,
              maxLength: 150
            }
          ]
        }
      ]
    },

    markdownTemplate: `
<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text={{hero.name}}&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35"/>

### {{hero.tagline}}

<br/>

</div>

## ✨ About Me

<img align="right" width="300" src="https://github-readme-stats.vercel.app/api?username={{stats.github_username}}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=667EEA&icon_color=F093FB&text_color=ffffff"/>

{{about.content}}

<br clear="right"/>

## 🛠️ Tech Stack

<div align="center">

{{stack.badges}}

</div>

## 📊 GitHub Analytics

<div align="center">

{{stats.content}}

<br/>

{{trophies.content}}

</div>

## 🌐 Connect With Me

<div align="center">

{{socials.content}}

</div>

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer"/>

### *{{end_quote.content}}*

</div>
    `
  }
];
