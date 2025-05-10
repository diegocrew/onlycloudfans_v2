// app.js for OnlyCloudFans UI2

// Spotlight Authors Data
const spotlightAuthors = [
  { name: "Alex Vega", quote: "10 ways FinOps changed our cloud cost culture" },
  { name: "Nina Kohler", quote: "Building secure landing zones at scale" },
  { name: "Raj Patel", quote: "Why latency matters in edge AI" },
  { name: "Maria Chen", quote: "Decoding DevOps in 2025" }
];

// Articles Feed Data
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

// Profile Data (static for now; ideally fetched from DB for logged-in user)
const liked = ["Azure vs AWS Pricing", "Cloud Regions Explained"];
const saved = ["Zero Trust in Practice", "Backup Strategies for GCP"];

document.addEventListener('DOMContentLoaded', () => {

  // --- Spotlight Logic ---
  const spotlightEl = document.getElementById("spotlight");
  if (spotlightEl) {
    let currentSpotlightIndex = 0;
    function updateSpotlight() {
      const author = spotlightAuthors[currentSpotlightIndex];
      spotlightEl.innerHTML = `
        <h2>🌟 Spotlight: ${author.name}</h2>
        <p>“${author.quote}”</p>
      `;
      currentSpotlightIndex = (currentSpotlightIndex + 1) % spotlightAuthors.length;
    }
    let spotlightInterval = setInterval(updateSpotlight, 10000);
    spotlightEl.addEventListener("mouseenter", () => clearInterval(spotlightInterval));
    spotlightEl.addEventListener("mouseleave", () => spotlightInterval = setInterval(updateSpotlight, 10000));
    if (spotlightAuthors.length > 0) { // Prevent error if array is empty
        updateSpotlight(); // Initial call
    }
  } else {
    console.warn("Spotlight element with ID 'spotlight' not found.");
  }

  // --- Articles Feed Logic ---
  const feedEl = document.getElementById("articles-feed");
  if (feedEl) {
    feedItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
      feedEl.appendChild(card);
    });
  } else {
    console.warn("Articles feed element with ID 'articles-feed' not found.");
  }

  // --- Profile Section Rendering Function ---
  function renderProfile(firebaseUser) {
    const usernameValueSpan = document.getElementById("profile-username-value");
    const bioValueSpan = document.getElementById("profile-bio-value");
    const usernameP = usernameValueSpan ? usernameValueSpan.parentElement : null;
    const likedArticlesUl = document.getElementById("liked-articles");
    const savedArticlesUl = document.getElementById("saved-articles");

    if (!usernameValueSpan || !bioValueSpan || !usernameP || !likedArticlesUl || !savedArticlesUl) {
      console.error("One or more profile elements are missing from the HTML. Please ensure spans with IDs 'profile-username-value', 'profile-bio-value' exist and ul elements with IDs 'liked-articles', 'saved-articles' exist.");
      return;
    }

    // Clear previous dynamic content from profile
    likedArticlesUl.innerHTML = '';
    savedArticlesUl.innerHTML = '';
    const existingAuthLink = usernameP.querySelector("a#auth-link");
    if (existingAuthLink) {
      // Remove the " - " text node before the link if it exists
      if (existingAuthLink.previousSibling && existingAuthLink.previousSibling.nodeType === Node.TEXT_NODE && existingAuthLink.previousSibling.textContent.trim() === '-') {
        existingAuthLink.previousSibling.remove();
      }
      existingAuthLink.remove();
    }

    if (firebaseUser) {
      // --- LOGGED-IN USER VIEW ---
      usernameValueSpan.textContent = firebaseUser.displayName || firebaseUser.email || "User"; // Display name or email

      // Bio: Firebase Auth doesn't store a custom bio.
      // This would typically be fetched from Firestore or Realtime Database using firebaseUser.uid.
      // For now, using a placeholder.
      bioValueSpan.textContent = "Welcome back! Edit your bio in profile settings."; // Placeholder

      // Populate Liked Articles
      if (liked.length > 0) {
        liked.forEach(itemText => {
          const li = document.createElement("li");
          li.textContent = itemText;
          likedArticlesUl.appendChild(li);
        });
      } else {
        likedArticlesUl.innerHTML = "<li>No liked articles yet.</li>";
      }


      // Populate Saved Articles
      if (saved.length > 0) {
        saved.forEach(itemText => {
          const li = document.createElement("li");
          li.textContent = itemText;
          savedArticlesUl.appendChild(li);
        });
      } else {
        savedArticlesUl.innerHTML = "<li>No saved articles yet.</li>";
      }


    } else {
      // --- GUEST VIEW ---
      usernameValueSpan.textContent = "guest";

      const authLink = document.createElement('a');
      authLink.href = '#'; // Or link to your login page/modal
      authLink.id = 'auth-link';
      authLink.textContent = 'login / register';
      authLink.style.marginLeft = '5px'; // Optional styling

      // Add event listener to trigger Firebase login
      authLink.addEventListener('click', (e) => {
        e.preventDefault();
        // TODO: Implement your Firebase login flow here.
        // This could involve redirecting to a login page, showing a modal,
        // or using FirebaseUI.
        // Example: firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        // For now, an alert:
        alert("Login/Register clicked! You need to implement your Firebase login flow trigger here.");
      });

      usernameP.appendChild(document.createTextNode(' - '));
      usernameP.appendChild(authLink);

      bioValueSpan.textContent = "not logged in"; // As per your requirement

      likedArticlesUl.innerHTML = "<li>for logged users only</li>";
      savedArticlesUl.innerHTML = "<li>for logged users only</li>";
    }
  }

  // --- Firebase Auth State Listener ---
  // Ensure Firebase SDK is loaded and initialized before this script.
  // (You mentioned functional login, so 'firebase' object should be globally available)
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged(user => {
      renderProfile(user); // Render profile based on auth state
    });
  } else {
    console.error("Firebase is not available. Profile section will default to guest view. Ensure Firebase SDK is loaded and initialized correctly before app.js.");
    renderProfile(null); // Fallback to guest view if Firebase isn't ready
  }

  // --- Stats Logic ---
  const statsEl = document.getElementById("cloud-stats");
  if (statsEl) {
    statsEl.innerHTML = `
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
  } else {
    console.warn("Stats element with ID 'cloud-stats' not found.");
  }

  // --- Dark Mode Toggle Logic ---
  const navLinksEl = document.querySelector(".nav-links");
  if (navLinksEl) {
    const darkBtn = document.createElement("button");
    darkBtn.textContent = "☾";
    darkBtn.className = "toggle-darkmode"; // Ensure this class is styled in your CSS
    darkBtn.title = "Toggle dark mode"; // Accessibility
    darkBtn.onclick = () => {
        document.body.classList.toggle("dark"); // Make sure you have a .dark class in CSS for body
        // Optional: Save preference to localStorage
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            darkBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            darkBtn.textContent = "☾";
        }
    };
    // Optional: Check localStorage for saved theme on load
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        darkBtn.textContent = "☀️";
    }
    navLinksEl.appendChild(darkBtn);
  } else {
    console.warn("Navigation links container with class '.nav-links' not found for dark mode button.");
  }

  // --- Hamburger Toggle Logic ---
  const navToggleEl = document.getElementById("nav-toggle");
  const navMenuEl = document.getElementById("nav-menu");
  if (navToggleEl && navMenuEl) {
    navToggleEl.addEventListener("click", () => {
      navMenuEl.classList.toggle("show"); // Ensure .show class is styled in your CSS for visibility
    });
  } else {
    console.warn("Nav toggle or nav menu elements ('nav-toggle', 'nav-menu') not found.");
  }

}); // End of DOMContentLoaded