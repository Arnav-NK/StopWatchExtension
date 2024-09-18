let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ hours: 0, minutes: 0, seconds: 0 });
});

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  saveTime();
}

function saveTime() {
  chrome.storage.local.set({ hours, minutes, seconds });
}

function startStopwatch() {
  if (timer !== null) {
    clearInterval(timer);
  }
  timer = setInterval(stopwatch, 1000);
}

function stopStopwatch() {
  clearInterval(timer);
}

function resetStopwatch() {
  clearInterval(timer);
  [hours, minutes, seconds] = [0, 0, 0];
  saveTime();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    startStopwatch();
  } else if (request.action === "stop") {
    stopStopwatch();
  } else if (request.action === "reset") {
    resetStopwatch();
  } else if (request.action === "getTime") {
    chrome.storage.local.get(['hours', 'minutes', 'seconds'], (result) => {
      sendResponse(result);
    });
    return true; // Keep the message channel open for sendResponse
  }
});
