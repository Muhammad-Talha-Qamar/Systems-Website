const slides = document.querySelectorAll(".slide");
const header = document.querySelector(".site-header");
let idx = 0;
let timer;

function show(i) {
  slides.forEach((s, n) => {
    s.classList.toggle("active", n === i);
    const v = s.querySelector("video");
    if (v) n === i ? v.play().catch(() => {}) : v.pause();
  });
  idx = i;
}

function next(dir = 1) {
  show((idx + dir + slides.length) % slides.length);
  restart();
}

function restart() {
  clearInterval(timer);
  timer = setInterval(() => next(1), 7000);
}

document.querySelector(".hero-nav.next")?.addEventListener("click", () => next(1));
document.querySelector(".hero-nav.prev")?.addEventListener("click", () => next(-1));
restart();

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

document.querySelectorAll("[data-hero-btn]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const href = btn.getAttribute("data-href");
    if (href) window.location.href = href;
  });
});

/* awards */
const track = document.querySelector(".award-track");
let awardX = 0;
document.querySelector("[data-award=prev]")?.addEventListener("click", () => {
  awardX = Math.min(0, awardX + 240);
  track.style.transform = `translateX(${awardX}px)`;
});
document.querySelector("[data-award=next]")?.addEventListener("click", () => {
  awardX -= 240;
  track.style.transform = `translateX(${awardX}px)`;
});

/* industries */
const industryData = {
  communications: {
    src: "https://www.systemsltd.com/themes/custom/sysltd/assets/images/global-images/communicationnew.gif",
  },
  banking: {
    src: "https://www.systemsltd.com/themes/custom/sysltd/assets/images/global-images/banknew.gif",
  },
  public: {
    src: "https://www.systemsltd.com/themes/custom/sysltd/assets/images/global-images/publicsectornew.gif",
  },
  healthcare: {
    src: "https://www.systemsltd.com/themes/custom/sysltd/assets/images/global-images/healthcarenew.gif",
  },
  retail: {
    src: "https://www.systemsltd.com/themes/custom/sysltd/assets/images/global-images/retailnew.gif",
  },
  automotive: {
    src: "https://www.systemsltd.com/themes/custom/sysltd/assets/images/global-images/automotivenew.gif",
  },
  hospitality: {
    src: "https://www.systemsltd.com/themes/custom/sysltd/assets/images/global-images/hotelnew.gif",
  },
};
const visual = document.querySelector("#industry-visual");
document.querySelectorAll(".industry-item").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    document.querySelectorAll(".industry-item").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const key = btn.dataset.industry;
    if (visual && industryData[key]) visual.src = industryData[key].src;
  });
});

/* search / region */
const search = document.querySelector(".search-overlay");
const region = document.querySelector(".region-overlay");
document.querySelector("[data-open=search]")?.addEventListener("click", () => search.classList.add("open"));
document.querySelector("[data-open=region]")?.addEventListener("click", () => region.classList.add("open"));
search?.addEventListener("click", (e) => { if (e.target === search) search.classList.remove("open"); });
region?.addEventListener("click", (e) => { if (e.target === region) region.classList.remove("open"); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    search?.classList.remove("open");
    region?.classList.remove("open");
  }
});

document.querySelector(".hamburger")?.addEventListener("click", () => {
  const nav = document.querySelector(".nav-center");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  nav.style.position = "absolute";
  nav.style.top = "72px";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.background = "#fff";
  nav.style.flexDirection = "column";
  nav.style.padding = "16px";
  nav.querySelectorAll(".nav-link").forEach((a) => (a.style.color = "#111"));
});

document.getElementById("enquiry-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const toast = document.querySelector(".toast");
  toast.textContent = "Thanks — your enquiry has been received.";
  toast.style.display = "block";
  e.target.reset();
  setTimeout(() => (toast.style.display = "none"), 3200);
});

document.getElementById("subscribe-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const toast = document.querySelector(".toast");
  toast.textContent = "You are subscribed.";
  toast.style.display = "block";
  e.target.reset();
  setTimeout(() => (toast.style.display = "none"), 3200);
});
