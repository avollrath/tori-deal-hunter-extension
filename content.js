(function () {
  const BUTTON_ID = "deal-hunter-copy-button";

  function clean(text = "") {
    return text
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getText(selector) {
    return clean(document.querySelector(selector)?.innerText || "");
  }

  function getDescription() {
    return [...document.querySelectorAll('[data-testid="description"] p')]
      .map((p) => clean(p.innerText))
      .filter(Boolean)
      .join("\n");
  }

  function getDetails() {
    return [...document.querySelectorAll('[aria-label="Lisätietoja"] span')]
      .map((el) => clean(el.innerText))
      .filter(Boolean)
      .join("\n");
  }

  function getPrice() {
    const candidates = [...document.querySelectorAll("div, h2, p, span")];

    const priceElement = candidates.find((el) => {
      const value = clean(el.innerText);
      return /^\d[\d\s.,]*\s€$/.test(value);
    });

    return clean(priceElement?.innerText || "");
  }

  function getSeller() {
    const profileLink = document.querySelector('a[href^="/profile/ads"]');
    return clean(profileLink?.innerText || "");
  }

  function getSellerInfo() {
    const profileSection = document.querySelector('a[href^="/profile/ads"]')?.closest("div");
    return clean(profileSection?.innerText || "");
  }

  function getMeta() {
    return getText('[data-testid="object-info"]');
  }

  function getShippingInfo() {
    const bodyText = document.body.innerText;
    const lines = bodyText
      .split("\n")
      .map(clean)
      .filter(Boolean);

    return lines.find((line) => line.includes("Toimitus alkaen")) || "";
  }

  function buildDealHunterText() {
    const title = getText('[data-testid="object-title"]');
    const price = getPrice();
    const details = getDetails();
    const location = getText('[data-testid="object-address"]');
    const description = getDescription();
    const seller = getSeller();
    const sellerInfo = getSellerInfo();
    const meta = getMeta();
    const shipping = getShippingInfo();

    return `Please evaluate this Tori listing as a flipping deal.

URL:
${window.location.href}

Title:
${title || "Not found"}

Price:
${price || "Not found"}

Details:
${details || "Not found"}

Location:
${location || "Not found"}

Shipping / ToriDiili:
${shipping || "Not found"}

Description:
${description || "Not found"}

Seller:
${seller || "Not found"}

Seller info:
${sellerInfo || "Not found"}

Meta:
${meta || "Not found"}`;
  }

  async function copyToClipboard(text) {
    await navigator.clipboard.writeText(text);
  }

  function showToast(message) {
    const existingToast = document.querySelector("#deal-hunter-toast");
    if (existingToast) existingToast.remove();

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

    setTimeout(() => {
      toast.remove();
    }, 1800);
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
      boxShadow: "0 8px 24px rgba(0,0,0,.22)"
    });

    button.addEventListener("click", async () => {
      try {
        const output = buildDealHunterText();
        await copyToClipboard(output.trim());

        button.textContent = "Copied!";
        showToast("Copied listing for Deal Hunter GPT");

        setTimeout(() => {
          button.textContent = "Copy for Deal Hunter";
        }, 1400);
      } catch (error) {
        console.error("Deal Hunter copy failed:", error);
        showToast("Copy failed, check console");
      }
    });

    document.body.appendChild(button);
  }

  createButton();
})();