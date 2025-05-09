const root = document.getElementById("root");
const spotlight = document.getElementById("spotlight");
const likedList = document.getElementById("liked-articles");
const savedList = document.getElementById("saved-articles");
const navLinks = document.querySelector(".nav-links");

// Inject section links into nav bar
const navSections = [
  { key: "mission", label: "Our Mission" },
  { key: "content", label: "Platform Content" },
  { key: "community", label: "Community" },
  { key: "trust", label: "Trusted & Secure" }
];

navSections.forEach(section => {
  const a = document.createElement("a");
  a.textContent = section.label;
  a.href = "#";
  a.dataset.scroll = section.key;
  navLinks.appendChild(a);
});

// Spotlight Rotation
const spotlightAuthors = [
  { name: "Alex Vega", quote: "10 ways FinOps changed our cloud cost culture" },
  { name: "Nina Kohler", quote: "Building secure landing zones at scale" },
  { name: "Raj Patel", quote: "Why latency matters in edge AI" },
  { name: "Maria Chen", quote: "Decoding DevOps in 2025" }
];

let currentSpotlight = 0;
let spotlightInterval;

function updateSpotlight() {
  const person = spotlightAuthors[currentSpotlight];
  spotlight.innerHTML = `
    <h2>🌟 Spotlight: ${person.name}</h2>
    <p>“${person.quote}”</p>
  `;
  currentSpotlight = (currentSpotlight + 1) % spotlightAuthors.length;
}

function startSpotlightRotation() {
  spotlightInterval = setInterval(updateSpotlight, 10000);
}

function stopSpotlightRotation() {
  clearInterval(spotlightInterval);
}

spotlight.addEventListener("mouseenter", stopSpotlightRotation);
spotlight.addEventListener("mouseleave", startSpotlightRotation);
updateSpotlight();
startSpotlightRotation();

// Nav Scroll Logic
const sectionMap = {
  home: spotlight,
  mission: () => document.getElementById("section-mission"),
  content: () => document.getElementById("section-content"),
  community: () => document.getElementById("section-community"),
  trust: () => document.getElementById("section-trust")
};

Object.keys(sectionMap).forEach(key => {
  const link = document.querySelector(`[data-scroll="${key}"]`);
  if (link) {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = sectionMap[key];
      const el = typeof target === "function" ? target() : target;
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// News Feed Items
const feedItems = [
  { id: "section-mission", title: "💡 Our Mission", desc: "Empower architects, developers, and decision-makers with trusted content across Azure, AWS, GCP, and more." },
  { id: "section-content", title: "☁️ Platform Content", desc: "Compare services, explore curated content, and go deep into cloud capabilities." },
  { id: "section-community", title: "👥 Community-Driven", desc: "Follow your favorite creators, get tailored updates, and grow with the cloud community." },
  { id: "section-trust", title: "🔒 Trusted & Secure", desc: "Curated by verified professionals. Privacy-first and ad-free." },
  { title: "Why GCP is killing it in AI", desc: "A breakdown of Google's AI-native strategy." },
  { title: "Azure Arc in the real world", desc: "Hybrid done right — field notes from enterprise deployments." },
  { title: "AWS IAM Pitfalls", desc: "What devs still get wrong about least privilege." }
];

feedItems.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";
  if (item.id) card.id = item.id;

  const title = document.createElement("h3");
  title.textContent = item.title;
  const desc = document.createElement("p");
  desc.textContent = item.desc;

  card.appendChild(title);
  card.appendChild(desc);
  root.appendChild(card);
});

// Profile info
["Azure vs AWS Pricing", "Cloud Regions Explained"].forEach(title => {
  const li = document.createElement("li");
  li.textContent = title;
  likedList.appendChild(li);
});

["Zero Trust in Practice", "Backup Strategies for GCP"].forEach(title => {
  const li = document.createElement("li");
  li.textContent = title;
  savedList.appendChild(li);
});

// Dark mode toggle
const toggle = document.createElement("button");
toggle.textContent = "☾";
toggle.className = "toggle-darkmode";
toggle.onclick = () => document.body.classList.toggle("dark");
navLinks.appendChild(toggle);
