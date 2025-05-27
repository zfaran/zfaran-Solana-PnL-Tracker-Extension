# Solana PnL Tracker Extension

![Banner Preview](https://i.ibb.co/R1dd5Pr/e751c696-c082-4778-855c-fe3578314259.png)

A real-time profit/loss tracker for Solana wallets that displays as an overlay on any webpage.

## Features ✨

- **Real-time Balance Tracking** - Updates every 5 seconds
- **Daily PnL Calculation** - Auto-resets at midnight (UTC)
- **Visual Indicators** - Color-coded positive/negative PnL
- **Percentage Change** - Shows profit/loss percentage
- **Draggable Widget** - Move anywhere on screen
- **US Time Display** - Shows current Eastern Time
- **Compact Design** - Minimal overlay that stays out of the way

## Installation Guide 🛠️

### Prerequisites
- Chrome browser (version 90+)
- Helius API key ([get one here](https://www.helius.dev/))
- Solana wallet address

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/solana-pnl-tracker.git
   cd solana-pnl-tracker

   ### Step 1: Get Your Helius API Key
1. Go to [Helius Dashboard](https://dev.helius.xyz/)
2. Sign up/log in and create a new API key
3. Copy your key (looks like `14793e41-9228-4b04-9f09-9168a741779c`)
Open content.js in a text editor and replace this exact line:
 `const API = "PASTE_YOUR_HELIUS_KEY_HERE"; // ← Replace this string`.

4. Load the Extension in Chrome
Open Chrome and go to:
`chrome://extensions/`
Enable Developer mode (toggle in top-right)
Click Load unpacked
Select the cloned repository folder




## 🌐 Configure Specific Websites (Optional)

By default, the extension works on all websites. To limit it to specific sites:

### Option 1: Modify in `manifest.json`

```json
{
  "manifest_version": 3,
  "content_scripts": [{
    "matches": [
      "https://jup.ag/*",
      "https://birdeye.so/*",
      "https://raydium.io/*",
      "https://solscan.io/*"
    ],
    "js": ["content.js"]
  }]
}


