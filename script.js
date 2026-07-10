const tables = {
  A: { type: "友人卓", guests: ["山田 翔太", "佐藤 美咲", "鈴木 大輔", "高橋 真央", "中村 翔", "小林 咲良"] },
  B: { type: "友人卓", guests: ["伊藤 遼", "加藤 美穂", "吉田 海斗", "清水 彩香", "木村 優斗", "松本 杏奈"] },
  C: { type: "友人卓", guests: ["岡田 健太", "森 美月", "藤田 翔平", "橋本 梨花", "西村 翼", "石井 優花"] },
  D: { type: "友人卓", guests: ["田中 悠斗", "井上 七海", "山口 達也", "前田 彩乃", "林 大地", "近藤 美月"] },
  E: { type: "親族席", guests: ["中村 恒一", "中村 真理", "中村 裕子", "中村 健太", "山本 千秋", "山本 美和"] },
  F: { type: "親族席", guests: ["佐藤 正和", "佐藤 由美", "佐藤 翼", "佐藤 明日香", "鈴木 孝志", "鈴木 恵子"] },
  G: { type: "親族席", guests: ["山田 隆", "山田 洋子", "山田 千尋", "山田 拓海", "高橋 和也", "高橋 奈々"] }
};

const menuData = {
  food: {
    label: "Food Menu",
    title: "Course",
    items: [
      ["Amuse-bouche / アミューズ", "フレンチキャビアと淡路島産トマトのジュレ", "軽やかなジュレにキャビアを添えて"],
      ["Entrée / 前菜", "瀬戸内海産オマール海老のカクテル　サフランの香り", "フレッシュなオマール海老とエレガントなサフラン風味"],
      ["Soup / スープ", "北海道産カボチャのポタージュ　トリュフのエッセンス", ""],
      ["Poisson / 魚料理", "駿河湾産ヒラメのポワレ　シャンパンクリームソース", ""],
      ["Plat Principal / メインディッシュ", "神戸牛フィレ肉のロティ　赤ワインソース", "付け合わせ：フランス・ボルドー産の赤ワインソース"],
      ["Dessert / デザート", "ピスタチオのムースと季節のフルーツの盛り合わせ", ""]
    ]
  },
  drink: {
    label: "Drink Menu",
    title: "Beverage",
    groups: {
      Beer: ["キリン一番搾り〈生ビール〉", "サントリーオールフリー"],
      Highball: ["角ハイボール", "ジムビームハイボール"],
      Sour: ["生搾りレモンサワー"],
      Sake: ["八海山（新潟）"],
      Shochu: ["富乃宝山（芋焼酎）"],
      Cocktail: ["カシスオレンジ", "ファジーネーブル"],
      "Soft Drink": ["烏龍茶", "緑茶（冷）", "ジンジャーエール", "コーラ", "オレンジジュース", "グレープフルーツジュース", "トマトジュース", "炭酸水"]
    }
  }
};

const tracks = [
  ["SWIM", "SIRUP"],
  ["Summer", "久石譲"],
  ["Do Well", "SIRUP"],
  ["瞳惚れ", "Vaundy"],
  ["やさしさにつつまれたなら", "新井由実"],
  ["Orphans", "cero"],
  ["お嫁においで 2015", "加山雄三 feat. PUNPEE"],
  ["friends", "brb. & SIRUP"],
  ["The Moment", "Ryohu"],
  ["RIDE", "TENDRE"],
  ["何億年たっても", "Tempalay"],
  ["忘れられないの", "サカナクション"],
  ["NEW ERA", "Nulbarich"],
  ["ガーデン", "藤井風"],
  ["Best Part", "Daniel Caesar"],
  ["遥かなる影", "カーペンターズ"],
  ["FLOWERS", "WONK"],
  ["旅路", "藤井風"],
  ["HOME", "AAAMYYY"]
];

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const openingStartedAt = Date.now();

function completeOpening() {
  const elapsed = Date.now() - openingStartedAt;
  const delay = Math.max(0, 1650 - elapsed);
  window.setTimeout(() => {
    document.body.classList.add("loaded");
  }, delay);
}

if (document.readyState === "complete") {
  completeOpening();
} else {
  window.addEventListener("load", completeOpening, { once: true });
}

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
);

function observeReveal(element, index = 0) {
  element.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
  revealObserver.observe(element);
}

document.querySelectorAll(".reveal, [data-fade], .image-reveal, .gallery-item:not([hidden])").forEach((element, index) => {
  observeReveal(element, index);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-past", !entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
  },
  { threshold: 0.04 }
);

document.querySelectorAll(".section").forEach((section) => sectionObserver.observe(section));

function updateParallax() {
  const viewportHeight = window.innerHeight;
  document.querySelectorAll("[data-parallax]").forEach((frame) => {
    const rect = frame.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewportHeight) return;
    const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
    const y = Math.max(-18, Math.min(18, progress * -24));
    frame.style.setProperty("--parallax-y", `${y}px`);
  });
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});
window.addEventListener("resize", updateParallax);
updateParallax();

function switchView(stackName, viewName) {
  const stack = document.querySelector(`[data-view-stack="${stackName}"]`);
  stack.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.dataset.view === viewName);
  });
}

document.querySelectorAll("[data-table]").forEach((button) => {
  button.addEventListener("click", () => {
    const tableId = button.dataset.table;
    const table = tables[tableId];
    document.getElementById("seat-type").textContent = table.type;
    document.getElementById("seat-title").textContent = `Table ${tableId}`;
    document.getElementById("guest-list").innerHTML = table.guests.map((guest) => `<li>${guest}</li>`).join("");
    switchView("seat", "seat-detail");
  });
});

document.querySelector("[data-seat-overview]").addEventListener("click", () => switchView("seat", "seat-overview"));

document.querySelectorAll('[data-back="seat"]').forEach((button) => {
  button.addEventListener("click", () => switchView("seat", "seat-list"));
});

document.querySelectorAll("[data-menu]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.menu;
    const data = menuData[key];
    document.getElementById("menu-label").textContent = data.label;
    document.getElementById("menu-title").textContent = data.title;
    document.getElementById("menu-detail-content").innerHTML = key === "food" ? renderFood(data.items) : renderDrink(data.groups);
    switchView("menu", "menu-detail");
  });
});

document.querySelector('[data-back="menu"]').addEventListener("click", () => switchView("menu", "menu-list"));

function renderFood(items) {
  return `<div class="food-list">${items
    .map(([course, name, note]) => `<article class="food-item"><h4>${course}</h4><p>${name}</p>${note ? `<p>${note}</p>` : ""}</article>`)
    .join("")}</div>`;
}

function renderDrink(groups) {
  return `<div class="drink-list">${Object.entries(groups)
    .map(([group, drinks]) => `<article class="drink-group"><h4>${group}</h4><p>${drinks.join(" / ")}</p></article>`)
    .join("")}</div>`;
}

document.getElementById("playlist").innerHTML = tracks
  .map(([title, artist], index) => `<article class="track"><span>${String(index + 1).padStart(2, "0")}</span><strong>${title}</strong><span>${artist}</span></article>`)
  .join("");

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const galleryMoreButton = document.getElementById("gallery-more");
const galleryGrid = document.querySelector(".gallery-grid");
const dynamicGalleryStart = 6;
const dynamicGalleryEnd = 30;
let dynamicGalleryItems = [];

function imageExists(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

function openLightbox(button) {
  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = button.querySelector("img").alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function createGalleryItem(src, number) {
  const button = document.createElement("button");
  button.className = "gallery-item gallery-extra reveal";
  button.type = "button";
  button.hidden = true;
  button.dataset.full = src;

  const image = document.createElement("img");
  image.src = src;
  image.alt = `Gallery photo ${String(number).padStart(2, "0")}`;
  button.appendChild(image);
  button.addEventListener("click", () => openLightbox(button));

  return button;
}

async function setupDynamicGallery() {
  if (!galleryMoreButton || !galleryGrid) return;

  for (let number = dynamicGalleryStart; number <= dynamicGalleryEnd; number += 1) {
    const src = `images/gallery-${String(number).padStart(2, "0")}.jpg`;
    if (!(await imageExists(src))) break;

    const item = createGalleryItem(src, number);
    galleryGrid.appendChild(item);
    dynamicGalleryItems.push(item);
  }

  galleryMoreButton.disabled = dynamicGalleryItems.length === 0;
  galleryMoreButton.setAttribute("aria-disabled", String(dynamicGalleryItems.length === 0));
}

if (galleryMoreButton) {
  galleryMoreButton.addEventListener("click", () => {
    if (galleryMoreButton.disabled) return;
    dynamicGalleryItems.forEach((item, index) => {
      item.hidden = false;
      item.classList.add("is-added");
      item.style.animationDelay = `${index * 110}ms`;
      observeReveal(item, index);
      window.setTimeout(() => item.classList.add("is-visible"), 40 + index * 110);
    });
    galleryMoreButton.parentElement.hidden = true;
  });
}

setupDynamicGallery();

document.querySelectorAll(".gallery-item").forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(button);
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});
