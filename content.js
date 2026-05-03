(function () {
  const BUTTON_ID = "deal-hunter-copy-button";

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

    console.log("=== Tori Deal Hunter ===");
    console.log("Title:", title);
    console.log("Price:", price);
    console.log("Condition:", condition);
    console.log("Location:", location);
    console.log("Shipping:", shipping);
    console.log("Description:", description);
    console.log("Seller:", seller);
    console.log("Meta:", meta);
    console.log("Ad ID:", adId);

    return `Please evaluate this Tori listing as a flipping deal.

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

  function showToast(message) {
    document.querySelector("#deal-hunter-toast")?.remove();

    const toast = document.createElement("div");
    toast.id = "deal-hunter-toast";
    toast.textContent = message;

    Object.assign(toast.style, {
      position: "fixed",
      right: "20px",
      bottom: "84px",
      zIndex: "999999",
      padding: "10px 14px",
      borderRadius: "10px",
      background: "#111",
      color: "#fff",
      fontSize: "13px",
      fontWeight: "600",
      boxShadow: "0 8px 24px rgba(0,0,0,.22)"
    });

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
  }

  function createButton() {
    if (document.querySelector(`#${BUTTON_ID}`)) return;

    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.textContent = "Copy for Deal Hunter";

    Object.assign(button.style, {
      position: "fixed",
      right: "20px",
      bottom: "20px",
      zIndex: "999999",
      padding: "12px 16px",
      borderRadius: "12px",
      border: "none",
      background: "#111",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
    });

    button.addEventListener("click", async () => {
      try {
        const output = buildOutput();
        await navigator.clipboard.writeText(output.trim());

        button.textContent = "✅ Copied!";
        showToast("Copied listing for Deal Hunter GPT");
      } catch (err) {
        console.error("Clipboard write failed:", err);
        button.textContent = "❌ Failed";
        showToast("Copy failed, check console");
      }

      setTimeout(() => {
        button.textContent = "Copy for Deal Hunter";
      }, 500);
    });

    document.body.appendChild(button);
  }

  setTimeout(createButton, 200);
})();