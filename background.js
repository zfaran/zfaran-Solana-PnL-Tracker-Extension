chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ pnlToday: 0 });
});
