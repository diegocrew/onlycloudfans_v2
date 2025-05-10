// app.js for OnlyCloudFans UI2

// Spotlight
const spotlightAuthors = [
  { name: "Alex Vega", quote: "10 ways FinOps changed our cloud cost culture" },
  { name: "Nina Kohler", quote: "Building secure landing zones at scale" },
  { name: "Raj Patel", quote: "Why latency matters in edge AI" },
  { name: "Maria Chen", quote: "Decoding DevOps in 2025" }
];

let currentSpotlight = 0;
const spotlight = document.getElementById("spotlight");

function updateSpotlight() {
  const author = spotlightAuthors[currentSpotlight];
  spotlight.innerHTML = `
    <h2>🌟 Spotlight: ${author.name}</h2>
    <p>“${author.quote}”</p>
  `;
  currentSpotlight = (currentSpotlight + 1) % spotlightAuthors.length;
}

let spotlightInterval = setInterval(updateSpotlight, 10000);
spotlight.addEventListener("mouseenter", () => clearInterval(spotlightInterval));
spotlight.addEventListener("mouseleave", () => spotlightInterval = setInterval(updateSpotlight, 10000));
updateSpotlight();

// Firebase Auth Check
firebase.auth().onAuthStateChanged(user => {
  const isLoggedIn = !!user;

  // Articles
  const feedItems = [
    { title: "Why GCP is killing it in AI", desc: "A breakdown of Google's AI-native strategy." },
    { title: "Azure Arc in the real world", desc: "Hybrid done right — field notes from enterprise deployments." },
    { title: "AWS IAM Pitfalls", desc: "What devs still get wrong about least privilege." },
    { title: "Serverless vs Containers in 2025", desc: "Which one to choose for scaling microservices?" },
    { title: "Azure Policy as Code", desc: "Governance automation with Bicep and Terraform." }
  ];

  const feed = document.getElementById("articles-feed");
  feedItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
    feed.appendChild(card);
  });

  // Profile
  const profilePanel = document.querySelector(".profile-panel");
  if (!isLoggedIn) {
    profilePanel.innerHTML = `<div class="card"><p><strong><a href='/login.html'>Log in / Register</a></strong> to access your profile, likes, and subscriptions.</p></div>`;
  } else {
    const liked = [
      "Azure vs AWS Pricing",
      "Cloud Regions Explained",
      "AI for FinOps",
      "Cloud Data Lake Patterns",
      "Terraform Module Best Practices",
      "Serverless in Real Life"
    ];

    const saved = [
      "Zero Trust in Practice",
      "Backup Strategies for GCP",
      "Multicloud DNS Failover",
      "Building with Azure Arc",
      "GitOps Crash Course",
      "Secrets Rotation Pipeline"
    ];

    liked.slice(0, 5).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      document.getElementById("liked-articles").appendChild(li);
    });

    saved.slice(0, 5).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      document.getElementById("saved-articles").appendChild(li);
    });

    const authors = ["Nina Kohler", "Alex Vega", "Tina Marsh", "Sergio Lin", "Maria Chen"];
    const authorSection = document.createElement("div");
    authorSection.className = "profile-section";
    authorSection.innerHTML = `<h3>Top Authors You Follow</h3><ul>${authors.map(name => `<li>${name}</li>`).join("")}</ul>`;
    profilePanel.appendChild(authorSection);

    const recommendations = ["Hybrid Identity", "Edge Machine Learning", "GitHub Actions Security"];
    const recSection = document.createElement("div");
    recSection.className = "profile-section";
    recSection.innerHTML = `<h3>You Might Like</h3><ul>${recommendations.map(name => `<li>${name}</li>`).join("")}</ul>`;
    profilePanel.appendChild(recSection);
  }

  // Stats
  const stats = document.getElementById("cloud-stats");
  stats.innerHTML = `
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
});

// Dark Mode Toggle
const darkBtn = document.createElement("button");
darkBtn.textContent = "☾";
darkBtn.className = "toggle-darkmode";
darkBtn.onclick = () => document.body.classList.toggle("dark");
document.querySelector(".nav-links").appendChild(darkBtn);

// Hamburger Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}
