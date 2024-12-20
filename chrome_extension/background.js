// Add this handler to your existing background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SECURITY_WARNING') {
    // Update the extension icon to show there's a warning
    chrome.action.setBadgeText({
      text: '!',
      tabId: sender.tab.id,
    });
    chrome.action.setBadgeBackgroundColor({
      color: '#FF0000',
      tabId: sender.tab.id,
    });

    chrome.action.setPopup({
      tabId: sender.tab.id,
      popup: 'popup.html',
    });

    // The popup will be shown when the user clicks the extension icon
    sendResponse({ success: true });
    return true;
  }
});

// Clear the badge when the popup is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.action.setBadgeText({
      text: '',
      tabId: tabId,
    });

    // Reset the popup
    chrome.action.setPopup({
      tabId: tabId,
      popup: '',
    });
  }
});
