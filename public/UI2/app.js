const root = document.getElementById("root");

const features = [
  {
    title: "💡 Our Mission",
    text: "Empower architects, developers, and decision-makers with trusted content across Azure, AWS, GCP, and more."
  },
  {
    title: "☁️ Platform Content",
    text: "Compare services, explore curated content, and go deep into cloud capabilities."
  },
  {
    title: "👥 Community-Driven",
    text: "Follow your favorite creators, get tailored updates, and grow with the cloud community."
  },
  {
    title: "🔒 Trusted & Secure",
    text: "Curated by verified professionals. Privacy-first and ad-free."
  }
];

features.forEach(feature => {
  const card = document.createElement("div");
  card.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = feature.title;
  card.appendChild(h2);

  const p = document.createElement("p");
  p.textContent = feature.text;
  card.appendChild(p);

  root.appendChild(card);
});
