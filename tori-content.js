(function () {
  const BUTTON_ID = "deal-hunter-evaluate-button";
  const CUSTOM_GPT_URL =
    "https://chatgpt.com/g/g-69f6f772324881918d188e23520ee624-tori-deal-hunter";

  function clean(text = "") {
    return text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
  }

  function findInAllShadows(root, selector) {
    const direct = root.querySelector(selector);
    if (direct) return direct;

    const all = root.querySelectorAll("*");
    for (const el of all) {
      if (el.shadowRoot) {
        const found = findInAllShadows(el.shadowRoot, selector);
        if (found) return found;
      }
    }

    return null;
  }

  function queryAll(root, selector) {
    const direct = [...root.querySelectorAll(selector)];
    const all = root.querySelectorAll("*");

    for (const el of all) {
      if (el.shadowRoot) {
        direct.push(...queryAll(el.shadowRoot, selector));
      }
    }

    return direct;
  }

  function getText(selector) {
    const el = findInAllShadows(document, selector);
    return el ? clean(el.textContent) : "";
  }

  function findTitle() {
    return getText('[data-testid="object-title"]') || getText("h1");
  }

  function findPrice() {
    return getText(".h2");
  }

  function findDescription() {
    return getText('[data-testid="description"]');
  }

  function findCondition() {
    const badges = queryAll(document, "section[aria-label='Lisätietoja'] span p");
    return badges.map((p) => clean(p.textContent)).filter(Boolean).join(" | ");
  }

  function findLocation() {
    return getText('[data-testid="object-address"]');
  }

  function findShipping() {
    return getText('[aria-hidden="false"]');
  }

  function findSeller() {
    return getText('a[href^="/profile/ads"]');
  }

  function findMeta() {
    return getText('[data-testid="object-info"]');
  }

  function findAdId() {
    const el = findInAllShadows(document, "[data-decodedadid]");
    return el ? el.getAttribute("data-decodedadid") : "";
  }

  function buildChatTitle(title, price) {
    const cleanTitle = title || "Tori listing";
    const cleanPrice = price || "";

    return `Evaluate: ${cleanTitle}${cleanPrice ? `, ${cleanPrice}` : ""}`;
  }

  function buildOutput() {
    const title = findTitle();
    const price = findPrice();
    const condition = findCondition();
    const location = findLocation();
    const shipping = findShipping();
    const description = findDescription();
    const seller = findSeller();
    const meta = findMeta();
    const adId = findAdId();
    const chatTitle = buildChatTitle(title, price);

    return `${chatTitle}

Please evaluate this Tori listing as a flipping deal.

URL:
${window.location.href}

Title:
${title || "Not found"}

Price:
${price || "Not found"}

Condition / Details:
${condition || "Not found"}

Location:
${location || "Not found"}

Shipping / ToriDiili:
${shipping || "Not found"}

Description:
${description || "Not found"}

Seller:
${seller || "Not found"}

Meta:
${meta || "Not found"}

Ad ID:
${adId || "Not found"}`;
  }

  function createButton() {
    if (document.querySelector(`#${BUTTON_ID}`)) return;

    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.textContent = "🚀 Evaluate with Deal Hunter";

    Object.assign(button.style, {
      position: "fixed",
      right: "20px",
      bottom: "20px",
      zIndex: "999999",
      padding: "14px 18px",
      borderRadius: "14px",
      border: "none",
      background: "linear-gradient(135deg, #611a24, #d3082a)",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      transition: "all 0.2s ease"
    });

    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 14px 40px rgba(0,0,0,0.3)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
      button.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
    });

    button.addEventListener("click", async () => {
      const prompt = buildOutput();

      await chrome.storage.local.set({
        dealHunterPrompt: prompt,
        dealHunterCreatedAt: Date.now()
      });

      button.textContent = "🚀 Opening Deal Hunter...";

      window.open(CUSTOM_GPT_URL, "_blank");

      setTimeout(() => {
        button.textContent = "🚀 Evaluate with Deal Hunter";
      }, 1600);
    });

    document.body.appendChild(button);
  }

  setTimeout(createButton, 300);
})();