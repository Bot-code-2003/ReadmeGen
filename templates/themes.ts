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

    markdownTemplate: `
<div align="center">

<p><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&duration=4000&pause=1000&color=39FF14&center=true&vCenter=true&width=600&lines=⚡+{{hero.name}}+⚡;Cyber+Punk+Geek;" alt="Typing SVG" /></p>

<pre align="center" style="color:#39ff14;">
██████╗ ██╗  ██╗ █████╗ ██████╗ ███╗   ███╗
██╔══██╗██║  ██║██╔══██╗██╔══██╗████╗ ████║
██████╔╝███████║███████║██████╔╝██╔████╔██║
██╔═══╝ ██╔══██║██╔══██║██╔═══╝ ██║╚██╔╝██║
██║     ██║  ██║██║  ██║██║     ██║ ╚═╝ ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝
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
    id: "medieval",
    name: "medieval scroll",
    banner: "https://media.giphy.com/media/5biVE87F1MER4UHfGY/giphy.gif",
    logoColor: "000000",
    statsTheme: "gruvbox",
    trophyTheme: "chalk",
    colors: ["8B4513", "8B0000", "B8860B", "556B2F", "6A5ACD", "483C32", "A52A2A"],

    markdownTemplate: `
<div align="center">

<img src="https://media.giphy.com/media/5biVE87F1MER4UHfGY/giphy.gif" width="100%" alt="castle-banner"/>

<h1>
  📜 The Chronicles of {{hero.name}}
</h1>

<p>
  <em>
    {{hero.tagline}}
  </em>
</p>

</div>

---

### 🪶 The Prologue
{{about.content}}

---

### ⚔️ Royal Armory
<div align="center">
  {{stack.badges}}
</div>

---

### 🕯️ Bard’s Scrolls
{{hobbies.content}}

---

### 📖 The Chronicles
{{stats.content}}

---

### 👑 Decrees of Honor
{{trophies.content}}

---

### 🔗 Guild Connections
{{socials.content}}

---

<div align="center">

<h3>
  ✦ In Code We Trust ✦
</h3>

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW5lZ2ZzNnQ1eXNic25xbmxpdHBwZHJvMDBoM3htY243MDRqa3oxMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9V5r8VjvEaNthMZMPx/giphy.gif" width="250" alt="torch"/>   
</div>
`,
  },
  
  
];
