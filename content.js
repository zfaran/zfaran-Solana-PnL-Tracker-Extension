const API = "YOUR_API_KEY"; // Replace with your actual API key
const banner = document.createElement("div");
banner.id = "pnlBanner";
banner.innerHTML = `

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
<style>
    /* Main Container */
    .pnl-container {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #141E30, #243B55);
        color: white;
        padding: 8px 14px;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 14px; /* Increased Size */
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.5);
        text-align: center;
        z-index: 9999;
        display: flex;
        align-items: center;
        min-width: 350px; /* Adjusted width */
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: grab;
        justify-content: space-between;
    }

    /* PNL Text - Everything in one line */
    .pnl-text {
        display: flex;
        align-items: center;
        font-size: 14px; /* Slightly increased */
        font-weight: 600;
        gap: 6px;
            flex-wrap: nowrap; /* Prevent wrapping */
    }

    /* Centering the "|" separator */
    .separator {
        font-weight: bold;
        opacity: 0.8;
    }

    /* Solana Logo Styling */
    .solana-logo {
        width: 14px;
        height: 14px;
        vertical-align: middle;
    }

    /* PNL Positive & Negative Colors */
    .pnl-positive {
        color: #00FF7F; /* Neon Green */
    }

    .pnl-negative {
        color: #FF4B4B; /* Red */
    }

    /* Reset Button - Inside the same row */
    #resetBtn {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        padding: 4px 8px;
        font-size: 13px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s ease-in-out;
        margin-left: 8px;
    }

    #resetBtn:hover {
        background: rgba(255, 255, 255, 0.4);
    }

    /* Close Button */
    .close-btn {
        position: absolute;
        top: -5px;
        right: -4px;
        background: none;
        border: none;
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0.7;
    }

    .close-btn:hover {
        opacity: 1;
    }
.us-time {
    font-weight: bold;
    margin-right: 15px;
    color: #ffffff;
    min-width: 90px; /* Ensures the time doesn't shift other elements */
    text-align: center;
}
.reset-time-container {
    display: flex;
    align-items: center;
    gap: 8px;
}


</style>

<div class="pnl-container" id="draggable-banner">
    <button class="close-btn" id="closeBanner">❌</button>
    <div class="pnl-text">
        <span>BAL:</span>
        <span id="balance">0.000</span>
        <img src="https://i.ibb.co/gbwjCpzT/solana-sol-logo.png" alt="Solana Logo" class="solana-logo">
        
        <span class="separator">|</span>

        <span>PNL:</span>
        <span id="pnlToday" class="pnl-positive">0.000</span>
        <small id="pnlPercentage" class="pnl-positive">(+0.00%)</small>
        <img src="https://i.ibb.co/gbwjCpzT/solana-sol-logo.png" alt="Solana Logo" class="solana-logo">
<div class="reset-time-container">
        <button id="resetBtn">Reset</button>
         <!-- US Time Display -->
        <span id="usTime" class="us-time"></span>
        </div>
    </div>
</div>

`;

document.body.appendChild(banner);

// Close Button Event Listener
document.getElementById("closeBanner").addEventListener("click", () => {
    banner.style.display = "none";
});

// Reset Button Event Listener
document.getElementById("resetBtn").addEventListener("click", () => {
    chrome.storage.local.set({ pnlToday: 0, lastResetDate: new Date().toISOString().split("T")[0] });
    document.getElementById("pnlToday").innerText = "0.00";
});

// Helius RPC URL
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${API}`;

// Function to Reset PNL Daily
function checkAndResetPNL() {
    const today = new Date().toISOString().split("T")[0];

    chrome.storage.local.get(["lastResetDate", "pnlToday"], (data) => {
        if (data.lastResetDate !== today) {
            chrome.storage.local.set({ pnlToday: 0, lastResetDate: today });
            document.getElementById("pnlToday").innerText = "0.00";
        }
    });
}

// Function to Fetch Balance & Calculate PNL
// Function to update PnL percentage dynamically
function updatePnlPercentage() {
    // Get balance and PnL values from the DOM
    let balanceElement = document.getElementById("balance");
    let pnlElement = document.getElementById("pnlToday");
    let pnlPercentageElement = document.getElementById("pnlPercentage");

    // Parse numerical values
    let balance = parseFloat(balanceElement.innerText.replace(',', ''));
    let pnl = parseFloat(pnlElement.innerText.replace(',', ''));

    // Calculate PnL percentage
    let pnlPercentage = balance !== 0 ? (pnl / balance) * 100 : 0;

    // Format and update the <small> element
    pnlPercentageElement.innerText = `(${pnlPercentage.toFixed(2)}%)`;

    // Apply styling based on positive/negative PnL
    if (pnl > 0) {
        pnlPercentageElement.classList.add("pnl-positive");
        pnlPercentageElement.classList.remove("pnl-negative");
    } else if (pnl < 0) {
        pnlPercentageElement.classList.add("pnl-negative");
        pnlPercentageElement.classList.remove("pnl-positive");
    }
}

// Function to update PnL percentage dynamically
function updatePnlPercentage() {
    // Get balance and PnL values from the DOM
    let balanceElement = document.getElementById("balance");
    let pnlElement = document.getElementById("pnlToday");
    let pnlPercentageElement = document.getElementById("pnlPercentage");

    // Parse numerical values
    let balance = parseFloat(balanceElement.innerText.replace(',', ''));
    let pnl = parseFloat(pnlElement.innerText.replace(',', ''));

    // Calculate PnL percentage
    let pnlPercentage = balance !== 0 ? (pnl / balance) * 100 : 0;

    // Format the PnL percentage with a + or - sign
    let formattedPercentage;
    if (pnlPercentage >= 0) {
        formattedPercentage = `(+${Math.abs(pnlPercentage).toFixed(2)}%)`; // Add + for 0 or increase
    } else {
        formattedPercentage = `(-${Math.abs(pnlPercentage).toFixed(2)}%)`; // Add - for decrease
    }

    // Update the <small> element
    pnlPercentageElement.innerText = formattedPercentage;

    // Apply styling based on positive/negative PnL or zero
    if (pnlPercentage >= 0) {
        pnlPercentageElement.classList.add("pnl-positive");
        pnlPercentageElement.classList.remove("pnl-negative");
    } else {
        pnlPercentageElement.classList.add("pnl-negative");
        pnlPercentageElement.classList.remove("pnl-positive");
    }
}

// Function to Fetch Balance & Calculate PNL
async function fetchPNL() {
    chrome.storage.local.get("walletAddress", async (data) => {
        if (!data.walletAddress) return;

        const wallet = data.walletAddress;

        try {
            const response = await fetch(HELIUS_RPC_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "getBalance",
                    params: [wallet]
                })
            });

            if (!response.ok) {
                console.error("Solana API Error:", response.status, response.statusText);
                return;
            }

            const result = await response.json();
            if (result.error) {
                console.error("Solana RPC Error:", result.error);
                return;
            }

            let balance = result.result.value / 1e9;

            chrome.storage.local.get(["prevBalance", "pnlToday"], (prevData) => {
                let prevBalance = prevData.prevBalance || balance;
                let pnl = prevData.pnlToday || 0;

                pnl += balance - prevBalance;

                chrome.storage.local.set({ prevBalance: balance, pnlToday: pnl });

                document.getElementById("balance").innerText = balance.toFixed(3);
                document.getElementById("pnlToday").innerText = `${pnl >= 0 ? "+" : "-"}${Math.abs(pnl).toFixed(3)}`;
                document.getElementById("pnlToday").className = pnl >= 0 ? "pnl-positive" : "pnl-negative";

                // Update PnL percentage after updating balance and PnL
                updatePnlPercentage();
            });

        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    });
}

// Run the function on page load
document.addEventListener("DOMContentLoaded", updatePnlPercentage);

// Update PnL percentage every second
setInterval(updatePnlPercentage, 1000);

// Fetch PNL every 5 seconds
setInterval(fetchPNL, 5000);
fetchPNL();


// Drag and Move Functionality
const bannerEl = document.getElementById("draggable-banner");

let offsetX, offsetY, isDragging = false;

bannerEl.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - bannerEl.offsetLeft;
    offsetY = e.clientY - bannerEl.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    bannerEl.style.left = `${e.clientX - offsetX}px`;
    bannerEl.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        chrome.storage.local.set({ bannerPosition: { top: bannerEl.style.top, left: bannerEl.style.left } });
    }
    isDragging = false;
});

// Restore Position
chrome.storage.local.get("bannerPosition", (data) => {
    if (data.bannerPosition) {
        bannerEl.style.top = data.bannerPosition.top;
        bannerEl.style.left = data.bannerPosition.left;
    }
});





// Check and reset PNL daily
checkAndResetPNL();

//US time set 


function updateUSTime() {
    const options = {
        timeZone: 'America/New_York', // Change to another US timezone if needed
        hour: '2-digit',
        minute: '2-digit',
        
        hour12: true
    };

    const timeString = new Date().toLocaleTimeString('en-US', options);
    document.getElementById('usTime').textContent = timeString;
}

// Update time every second
setInterval(updateUSTime, 1000);

// Initialize time immediately on page load
updateUSTime();



