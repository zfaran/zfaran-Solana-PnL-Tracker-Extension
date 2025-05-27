document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("walletAddress", (data) => {
        if (data.walletAddress) {
            document.getElementById("walletAddress").value = data.walletAddress;
        }
    });
});

document.getElementById("saveWallet").addEventListener("click", () => {
    let wallet = document.getElementById("walletAddress").value.trim();
    if (!wallet) {
        alert("Please enter a valid Solana wallet address.");
        return;
    }

    chrome.storage.local.set({ walletAddress: wallet }, () => {
        alert("Wallet saved!");
        chrome.runtime.sendMessage({ action: "walletUpdated" }); // Notify content script
    });
});

document.getElementById("resetPNL").addEventListener("click", () => {
    chrome.storage.local.set({ pnlToday: 0, lastResetDate: new Date().toISOString().split("T")[0] }, () => {
        alert("PNL Reset!");
        chrome.runtime.sendMessage({ action: "resetPNL" }); // Notify content script
    });
});
    