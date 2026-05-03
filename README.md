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

```text
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