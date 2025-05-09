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
  { title: "Why GCP is killing it in AI", desc: "A breakdown of Google's AI-native strategy." },
  { title: "Azure Arc in the real world", desc: "Hybrid done right — field notes from enterprise deployments." },
  { title: "AWS IAM Pitfalls", desc: "What devs still get wrong about least privilege." },
  { title: "Serverless vs Containers in 2025", desc: "Which one to choose for scaling microservices?" },
  { title: "Azure Policy as Code", desc: "Governance automation with Bicep and Terraform." },
  { title: "Comparing S3, Blob, and GCS", desc: "Object storage showdown: features, pricing, performance." },
  { title: "Kubernetes Ingress in Multi-Cloud", desc: "Managing traffic across cloud providers securely." },
  { title: "Top 10 DevOps Tools You Forgot", desc: "Overlooked but powerful tools that save time." },
  { title: "Cloud Regions and Carbon Impact", desc: "How cloud geography affects sustainability." },
  { title: "AI Ops in Production", desc: "How AI is being used to auto-resolve incidents." },
  { title: "Monitoring GCP with OpenTelemetry", desc: "Traces, metrics, and logs in one open standard." },
  { title: "Secrets Management in Kubernetes", desc: "Don't store tokens in YAML. Here's what to do instead." },
  { title: "The Economics of Cloud Migration", desc: "Cost modeling tips for enterprises shifting to cloud." },
  { title: "Disaster Recovery in Azure", desc: "Designing for high availability across regions." },
  { title: "AWS Nitro Enclaves Explained", desc: "What they are, when to use them, and caveats." },
  { title: "Zero Trust Beyond Marketing", desc: "Real-world patterns and policies you can use today." },
  { title: "Cloudflare vs AWS Shield", desc: "A deep dive into DDoS protection services." },
  { title: "Multicloud DNS Management", desc: "Using Traffic Director, Route 53, and Azure DNS together." },
  { title: "CI/CD Anti-patterns", desc: "The mistakes that slow down your pipeline." },
  { title: "The Rise of Cloud IDEs", desc: "Codespaces, Cloud9, and more — are they worth it?" },
  { title: "Cloud Cost Anomalies You Missed", desc: "Small leaks that cause big bills and how to find them." }
];

const feedColumn = document.getElementById("articles-feed");
feedItems.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("h3");
  title.textContent = item.title;
  const desc = document.createElement("p");
  desc.textContent = item.desc;

  card.appendChild(title);
  card.appendChild(desc);
  feedColumn.appendChild(card);
});

// Fill profile sections
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

// Cloud Stats Panel
const statsColumn = document.getElementById("cloud-stats");
statsColumn.innerHTML = `
  <div class="card">
    <h3>🌩️ Cloud Stats</h3>
    <p><strong>Authors:</strong> 42</p>
    <p><strong>Articles:</strong> 326</p>
    <p><strong>Top Clouds:</strong> Azure (112), AWS (94), GCP (67), OCI (29), IBM (24)</p>
  </div>
  <div class="card">
    <h3>🔥 Trending Now</h3>
    <p>"Cloud FinOps" <span style="color:#00ffcc">+85%</span></p>
    <p>"Hybrid Kubernetes" <span style="color:#00ffcc">+64%</span></p>
    <p>"AI for Ops" <span style="color:#00ffcc">+47%</span></p>
  </div>
  <div class="card">
    <h3>🏆 Most Liked</h3>
    <p>"Latency & Edge AI" — 212 likes</p>
    <p>"Zero Trust in 5 Minutes" — 189 likes</p>
    <p>"Best Terraform Modules 2025" — 175 likes</p>
  </div>
  <div class="card">
    <h3>📊 Monthly Highlights</h3>
    <p>New users: 186</p>
    <p>Comments: 938</p>
    <p>Bookmarks: 412</p>
  </div>
`;
