# Tori Deal Hunter

A Microsoft Edge / Chromium extension that extracts Tori.fi listing data and sends it directly to a custom Deal Hunter GPT for instant evaluation.

This removes the friction of manually copying listing details and turns any Tori item into a one-click AI-powered flipping analysis.

---

## ✨ Features

- One-click **🚀 Evaluate with Deal Hunter** button on Tori listings  
- Automatically extracts listing data even from **shadow DOM**  
- Opens your custom GPT and **auto-sends the prompt**  
- No manual copy or paste required  
- Works with:
  - title
  - price
  - condition / details
  - location
  - shipping / ToriDiili info
  - description
  - seller
  - metadata  
- Fast, minimal, and fully integrated into your browsing flow  

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

1. Open any Tori item page  
2. Click the floating button:  

   `🚀 Evaluate with Deal Hunter`

3. A new tab opens with your custom GPT  
4. The listing is automatically inserted and sent  
5. The evaluation appears instantly  

---

## 🛠️ How it works

Tori renders listing content inside **shadow DOM**, which breaks normal DOM queries.

This extension solves that by:

- recursively traversing all shadow roots  
- extracting structured data using stable selectors  
- collecting all relevant listing fields  
- storing the prompt temporarily in extension storage  
- opening the custom GPT page  
- injecting and sending the prompt automatically  

---

## 📦 Tech

- Vanilla JavaScript  
- Chrome Extension Manifest v3  
- Works in Edge and Chrome  
- Uses content scripts for both Tori and ChatGPT  

---

## 🔒 Safety

- No login access  
- No account automation on Tori  
- No external scraping  
- No API keys in the extension  
- Uses only normal browser capabilities  
```