
var len = 0

function removeAds() {
  const useElements = document.querySelectorAll('use')
  try {
    for (; len < useElements.length; len++) {
      const link = useElements[len].getAttribute("xlink:href").substring(1)
      if (document.querySelector(`text[id=${link}]`).innerHTML === "Sponsored") {
        useElements[len].closest('div[role]').hidden = true
        // feedunit.style.borderStyle = 'solid'
        // feedunit.style.borderColor = 'red'
      }
    }
  } catch (e) {
    console.log('facebook adblock error:', e)
  }
}

function main() {
  var feed = document.querySelector("div[role='feed']")
  if (feed) {
    removeAds()
    let feedObserver = new MutationObserver(mutationRecords => {
      mutationRecords.forEach(function (mutation) {
        removeAds()
      });
    });
    feedObserver.observe(feed, { childList: true, subtree: true });
  }
}

if (document.readyState === 'complete') {
  main();
}
else {
  window.onload = main()
}
