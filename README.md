# Tori Deal Hunter Copy

A lightweight Microsoft Edge / Chromium extension that extracts Tori.fi listing data and formats it for instant analysis with a custom Deal Hunter GPT.

This removes the friction of manually copying listing details and turns any Tori item into a structured input in one click.

---

## ✨ Features

- One-click **"Copy for Deal Hunter"** button on Tori listings
- Extracts data even from **shadow DOM** (used by Tori)
- Copies clean, structured text ready for GPT evaluation
- Works with:
  - title
  - price
  - condition / details
  - location
  - shipping / ToriDiili info
  - description
  - seller
  - metadata
- Non-invasive, no scraping automation, no login required

---

## 🧠 Example Output

```
Please evaluate this Tori listing as a flipping deal.

URL:
https://www.tori.fi/recommerce/forsale/item/12345678

Title:
Wireless Noise Cancelling Headphones, like new

Price:
85 €

Condition / Details:
Kunto: Kuin uusi | Merkki: Sony

Location:
00100 Helsinki, Kamppi, Uusimaa

Shipping / ToriDiili:
Toimitus alkaen 4,90 € + ToriDiili-palvelumaksu 8,50 €

Description:
Used only a few times, works perfectly. Includes original box and charging cable.

Seller:
Example Seller

Meta:
Viimeksi muokattu: 01.01.2026 ・ Ilmoituksen tunnus: 12345678
```

---

## 🚀 Installation (Microsoft Edge)

1. Open Edge  
2. Go to: `edge://extensions`  
3. Enable **Developer mode**  
4. Click **Load unpacked**  
5. Select this project folder  

---

## 🧪 Usage

1. Open any Tori item page, for example:  
   `https://www.tori.fi/recommerce/forsale/item/*`

2. Click the floating button:  
   `Copy for Deal Hunter`

3. Paste into your custom GPT  
4. Get instant deal evaluation  

---

## 🛠️ How it works

Tori renders listing content inside **shadow DOM**, which breaks normal query selectors.

This extension solves that by:

- recursively traversing all shadow roots
- extracting structured data via:
  - `data-testid` attributes
  - semantic selectors
- falling back gracefully when needed

Core helpers:

```js
findInAllShadows()
queryAll()
```

---

## 📦 Tech

- Vanilla JavaScript  
- Chrome Extension Manifest v3  
- Works in Edge and Chrome  

---

## 🔒 Safety

- No login access  
- No automation of buying or messaging  
- No scraping outside the browser context  
- Fully compliant with normal browsing behavior  

---

## 💡 Future ideas

- Open ChatGPT automatically with prefilled prompt  
- Add “Evaluate deal” button instead of copy  
- Track viewed listings and decisions  
- Auto price comparison / resale suggestions  

---

## 👤 Author

Built as part of a flipping workflow system for analyzing second-hand deals on Tori.fi.