(function () {
  const MAX_PROMPT_AGE_MS = 2 * 60 * 1000;
  const MAX_ATTEMPTS = 40;
  const ATTEMPT_DELAY_MS = 500;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function isDealHunterPage() {
    return window.location.href.includes(
      "/g/g-69f6f772324881918d188e23520ee624-tori-deal-hunter"
    );
  }

  function findPromptInput() {
    return (
      document.querySelector("#prompt-textarea") ||
      document.querySelector('div[contenteditable="true"]') ||
      document.querySelector("textarea")
    );
  }

  function findSendButton() {
    return (
      document.querySelector('[data-testid="send-button"]') ||
      document.querySelector('button[aria-label="Send prompt"]') ||
      document.querySelector('button[aria-label="Send message"]') ||
      document.querySelector('button[data-testid*="send"]')
    );
  }

  function setNativeValue(element, value) {
    const tagName = element.tagName.toLowerCase();

    if (tagName === "textarea" || tagName === "input") {
      const prototype = tagName === "textarea"
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;

      const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
      setter.call(element, value);

      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }

    element.focus();
    element.textContent = value;
    element.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        inputType: "insertText",
        data: value
      })
    );
  }

  async function insertPromptAndSend(prompt) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const input = findPromptInput();

      if (!input) {
        await sleep(ATTEMPT_DELAY_MS);
        continue;
      }

      input.focus();
      setNativeValue(input, prompt);

      await sleep(500);

      const sendButton = findSendButton();

      if (sendButton && !sendButton.disabled && sendButton.getAttribute("aria-disabled") !== "true") {
        sendButton.click();
        await chrome.storage.local.remove(["dealHunterPrompt", "dealHunterCreatedAt"]);
        return true;
      }

      input.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          bubbles: true,
          cancelable: true
        })
      );

      await sleep(ATTEMPT_DELAY_MS);
    }

    return false;
  }

  async function run() {
    if (!isDealHunterPage()) return;

    const { dealHunterPrompt, dealHunterCreatedAt } =
      await chrome.storage.local.get(["dealHunterPrompt", "dealHunterCreatedAt"]);

    if (!dealHunterPrompt || !dealHunterCreatedAt) return;

    const isExpired = Date.now() - dealHunterCreatedAt > MAX_PROMPT_AGE_MS;
    if (isExpired) {
      await chrome.storage.local.remove(["dealHunterPrompt", "dealHunterCreatedAt"]);
      return;
    }

    await sleep(1200);

    const success = await insertPromptAndSend(dealHunterPrompt);

    if (!success) {
      console.warn("Deal Hunter: Could not auto-send prompt. Prompt remains in storage.");
    }
  }

  run();
})();