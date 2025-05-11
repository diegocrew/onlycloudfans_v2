// app.js for OnlyCloudFans UI2 (Main Landing Page - index.html)

// Import necessary Firebase functions
// These MUST be at the top level of the module.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// IMPORTANT: Use ReCaptchaEnterpriseProvider for reCAPTCHA Enterprise
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-check.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

console.log("app.js: Script started. Attempting to import Firebase SDKs...");

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAw2vYrNRSu5nrbmJUPX_2frO9Y0ARNPk", // Replace with your actual API key
  authDomain: "onlycloudfans.firebaseapp.com",
  projectId: "onlycloudfans",
  storageBucket: "onlycloudfans.firebasestorage.app", // Or your verified one
  messagingSenderId: "1047876908790",
  appId: "1:1047876908790:web:ff88b8f947a593a0551ed7",
  measurementId: "G-1RW5MYZKDB" // Optional
};
console.log("app.js: firebaseConfig object:", firebaseConfig);

// Initialize Firebase
let app;
let auth;
let db;
let appCheck;

try {
  console.log("app.js: Attempting Firebase initialization...");
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error("firebaseConfig is missing or apiKey is not defined.");
  }
  app = initializeApp(firebaseConfig);
  console.log("app.js: Firebase app initialized:", app);

  // Initialize App Check with reCAPTCHA Enterprise Provider
  // TODO: REPLACE 'YOUR_RECAPTCHA_ENTERPRISE_SITE_KEY' with your actual reCAPTCHA Enterprise site key.
  // You get this from the Google Cloud Console under "reCAPTCHA Enterprise".
  const reCaptchaEnterpriseSiteKey = '6Le8_TUrAAAAAI4eupkBujQgcb-MsZ8HFOv4Muwj'; // <--- IMPORTANT: REPLACE THIS!

  if (reCaptchaEnterpriseSiteKey === 'YOUR_RECAPTCHA_ENTERPRISE_SITE_KEY' || !reCaptchaEnterpriseSiteKey) {
      console.error("app.js: CRITICAL - reCAPTCHA Enterprise Site Key is missing or still a placeholder. App Check will fail.");
      // Consider throwing an error or preventing further execution if the key is missing.
  }

  // Ensure you are using ReCaptchaEnterpriseProvider here
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(reCaptchaEnterpriseSiteKey),
    isTokenAutoRefreshEnabled: true // Set to true for automatic token refresh
  });
  console.log("app.js: Firebase App Check initialized with ReCaptchaEnterpriseProvider.");


  auth = getAuth(app);
  console.log("app.js: Firebase auth initialized:", auth);

  db = getFirestore(app);
  console.log("app.js: Firebase db (Firestore) initialized:", db);

  console.log("app.js: Firebase core services initialized successfully (including App Check with Enterprise provider).");
} catch (error) {
  console.error("app.js: Firebase_INITIALIZATION_ERROR (this might include App Check errors):", error);
  if (error.message.includes("reCAPTCHA") || error.message.includes("AppCheck")) {
      console.error("app.js: The error seems related to App Check or reCAPTCHA. Verify your Enterprise site key and reCAPTCHA Enterprise setup in Google Cloud Console.");
  }
}

// --- Static Data ---
const spotlightAuthors = [
  { name: "Alex Vega", quote: "10 ways FinOps changed our cloud cost culture" },
  { name: "Nina Kohler", quote: "Building secure landing zones at scale" },
  { name: "Raj Patel", quote: "Why latency matters in edge AI" },
  { name: "Maria Chen", quote: "Decoding DevOps in 2025" }
];
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
const staticLikedArticles = ["Azure vs AWS Pricing", "Cloud Regions Explained"];
const staticSavedArticles = ["Zero Trust in Practice", "Backup Strategies for GCP"];

// --- DOM Elements Cache ---
let spotlightEl, feedEl, statsEl, usernameValueSpan, bioValueSpan, usernamePContainer,
    likedArticlesUl, savedArticlesUl, navLinksEl, navToggleEl, navMenuEl;

function cacheDOMElements() {
    spotlightEl = document.getElementById("spotlight");
    feedEl = document.getElementById("articles-feed");
    statsEl = document.getElementById("cloud-stats");
    usernameValueSpan = document.getElementById("profile-username-value");
    bioValueSpan = document.getElementById("profile-bio-value");
    usernamePContainer = usernameValueSpan ? usernameValueSpan.parentElement : null;
    likedArticlesUl = document.getElementById("liked-articles");
    savedArticlesUl = document.getElementById("saved-articles");
    navLinksEl = document.querySelector(".nav-links");
    navToggleEl = document.getElementById("nav-toggle");
    navMenuEl = document.getElementById("nav-menu");
    console.log("app.js: DOM elements cached.");
}

// --- Rendering Functions ---
function renderSpotlight() {
  try {
    if (spotlightEl && spotlightAuthors.length > 0) {
      let currentSpotlightIndex = 0;
      const update = () => {
        const author = spotlightAuthors[currentSpotlightIndex];
        spotlightEl.innerHTML = `<h2>🌟 Spotlight: ${author.name}</h2><p>“${author.quote}”</p>`;
        currentSpotlightIndex = (currentSpotlightIndex + 1) % spotlightAuthors.length;
      };
      let spotlightInterval = setInterval(update, 10000);
      spotlightEl.addEventListener("mouseenter", () => clearInterval(spotlightInterval));
      spotlightEl.addEventListener("mouseleave", () => spotlightInterval = setInterval(update, 10000));
      update();
    } else if (!spotlightEl) {
      console.warn("app.js: Spotlight element with ID 'spotlight' not found.");
    }
  } catch (error) {
    console.error("app.js: Error rendering spotlight:", error);
  }
}

function renderArticlesFeed() {
  try {
    if (feedEl) {
      feedEl.innerHTML = '';
      feedItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
        feedEl.appendChild(card);
      });
    } else {
      console.warn("app.js: Articles feed element with ID 'articles-feed' not found.");
    }
  } catch (error) {
    console.error("app.js: Error rendering articles feed:", error);
  }
}

function renderCloudStats() {
  try {
    if (statsEl) {
      statsEl.innerHTML = `
        <div class="card"><h3>🌩️ Cloud Stats</h3><p><strong>Authors:</strong> 42</p><p><strong>Articles:</strong> 326</p><p><strong>Top Clouds:</strong> Azure (112), AWS (94), GCP (67), OCI (29), IBM (24)</p></div>
        <div class="card"><h3>🔥 Trending Now</h3><p>"Cloud FinOps" <span style="color:#00ffcc">+85%</span></p><p>"Hybrid Kubernetes" <span style="color:#00ffcc">+64%</span></p><p>"AI for Ops" <span style="color:#00ffcc">+47%</span></p></div>
        <div class="card"><h3>🏆 Most Liked</h3><p>"Latency & Edge AI" — 212 likes</p><p>"Zero Trust in 5 Minutes" — 189 likes</p><p>"Best Terraform Modules 2025" — 175 likes</p></div>
        <div class="card"><h3>📊 Monthly Highlights</h3><p>New users: 186</p><p>Comments: 938</p><p>Bookmarks: 412</p></div>
      `;
    } else {
      console.warn("app.js: Stats element with ID 'cloud-stats' not found.");
    }
  } catch (error) {
    console.error("app.js: Error rendering cloud stats:", error);
  }
}

async function renderProfile(firebaseUser) {
  try {
    if (!usernameValueSpan || !bioValueSpan || !usernamePContainer || !likedArticlesUl || !savedArticlesUl) {
      console.error("app.js: One or more profile elements are missing from index.html. Profile section cannot be rendered.");
      return;
    }

    likedArticlesUl.innerHTML = '';
    savedArticlesUl.innerHTML = '';
    const existingAuthLinkDetails = usernamePContainer.querySelector(".auth-link-details");
    if (existingAuthLinkDetails) existingAuthLinkDetails.remove();

    if (firebaseUser) {
      let displayName = firebaseUser.displayName || firebaseUser.email || "User";
      if (db) { // Check if Firestore (db) is initialized
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            displayName = userData.displayName || displayName;
            usernameValueSpan.innerHTML = '';
            const profileLinkUsername = document.createElement('a');
            profileLinkUsername.href = "/account/myaccount.html";
            profileLinkUsername.textContent = displayName;
            profileLinkUsername.style.fontWeight = "bold";
            usernameValueSpan.appendChild(profileLinkUsername);
            if (userData.bio) {
                 bioValueSpan.textContent = userData.bio;
            } else {
                const bioLink = document.createElement('a');
                bioLink.href = "/account/myaccount.html";
                bioLink.textContent = "No bio set. Click here to update.";
                bioValueSpan.innerHTML = '';
                bioValueSpan.appendChild(bioLink);
            }
          } else {
            usernameValueSpan.textContent = displayName;
            bioValueSpan.innerHTML = 'Profile not fully set up. <a href="/account/myaccount.html">Complete it here</a>.';
          }
        } catch (firestoreError) {
          console.error("app.js: Error fetching user profile from Firestore:", firestoreError);
          usernameValueSpan.textContent = displayName;
          bioValueSpan.textContent = "Could not load profile bio.";
        }
      } else {
        usernameValueSpan.textContent = displayName;
        bioValueSpan.textContent = "Bio not available (DB connection issue).";
      }
      staticLikedArticles.forEach(itemText => {
        const li = document.createElement("li");
        li.textContent = itemText;
        likedArticlesUl.appendChild(li);
      });
      staticSavedArticles.forEach(itemText => {
        const li = document.createElement("li");
        li.textContent = itemText;
        savedArticlesUl.appendChild(li);
      });
    } else {
      usernameValueSpan.textContent = "guest";
      bioValueSpan.textContent = "not logged in";
      const authLinkSpan = document.createElement('span');
      authLinkSpan.className = 'auth-link-details';
      authLinkSpan.appendChild(document.createTextNode(' - '));
      const authLink = document.createElement('a');
      authLink.href = '/auth.html';
      authLink.textContent = 'login / register';
      authLinkSpan.appendChild(authLink);
      if (usernamePContainer) {
          usernamePContainer.appendChild(authLinkSpan);
      }
      likedArticlesUl.innerHTML = "<li>for logged users only</li>";
      savedArticlesUl.innerHTML = "<li>for logged users only</li>";
    }
  } catch (profileError) {
    console.error("app.js: Error rendering profile section:", profileError);
    if (usernameValueSpan) usernameValueSpan.textContent = "guest";
    if (bioValueSpan) bioValueSpan.textContent = "Profile data unavailable.";
  }
}

function setupNavigationAndToggles() {
  try {
    if (navLinksEl) {
      const existingDarkBtn = navLinksEl.querySelector(".toggle-darkmode");
      if (existingDarkBtn) existingDarkBtn.remove();
      const darkBtn = document.createElement("button");
      darkBtn.className = "toggle-darkmode";
      darkBtn.title = "Toggle dark mode";
      if (localStorage.getItem("theme") === "dark") {
          document.body.classList.add("dark");
          darkBtn.textContent = "☀️";
      } else {
          darkBtn.textContent = "☾";
      }
      darkBtn.onclick = () => {
          document.body.classList.toggle("dark");
          if (document.body.classList.contains("dark")) {
              localStorage.setItem("theme", "dark");
              darkBtn.textContent = "☀️";
          } else {
              localStorage.setItem("theme", "light");
              darkBtn.textContent = "☾";
          }
      };
      navLinksEl.prepend(darkBtn);
    } else {
      console.warn("app.js: Navigation links container with class '.nav-links' not found for dark mode button.");
    }
    if (navToggleEl && navMenuEl) {
      navToggleEl.addEventListener("click", () => {
        navMenuEl.classList.toggle("show");
      });
    } else {
      console.warn("app.js: Nav toggle or nav menu elements ('nav-toggle', 'nav-menu') not found.");
    }
  } catch (error) {
    console.error("app.js: Error setting up navigation/toggles:", error);
  }
}

// --- Main Execution on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
  console.log("app.js: DOM fully loaded and parsed. Initializing app logic...");
  cacheDOMElements();

  renderSpotlight();
  renderArticlesFeed();
  renderCloudStats();
  setupNavigationAndToggles();

  if (app && auth && db && appCheck) {
    console.log("app.js: Firebase app, auth, db, and appCheck services appear to be initialized. Setting up onAuthStateChanged listener.");
    onAuthStateChanged(auth, (user) => {
      console.log("app.js: Auth state changed. User:", user ? user.email : 'No user');
      renderProfile(user);
    }, (error) => {
      console.error("app.js: Firebase Auth state listener error:", error);
      renderProfile(null);
    });
  } else {
    console.warn("app.js: One or more Firebase core services (app, auth, db, appCheck) NOT initialized. Profile section will default to guest view. Check for 'Firebase_INITIALIZATION_ERROR' above.");
    renderProfile(null);
  }
});
