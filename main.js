// credits to https://github.com/facebook-adblock/facebook_adblock/ for languages
const sponsoredTexts = [
  "Sponsored",
  "مُموَّل", // Arabic
  "赞助内容", // Chinese (Simplified)
  "贊助", // Chinese (Traditional)
  "Sponzorováno", // Czech
  "Gesponsord", // Dutch
  "May Sponsor", // Filipino
  "Commandité", // French (Canada)
  "Sponsorisé", // French
  "Gesponsert", // German
  "Χορηγούμενη", // Greek
  "ממומן", // Hebrew
  "प्रायोजित", // Hindi
  "Hirdetés", // Hungarian
  "Bersponsor", // Indonesian
  "Sponsorizzato", // Italian
  "広告", // Japanese
  "Sponsorowane", // Polish
  "Patrocinado", // Portuguese (Brazil)
  "Sponsorizat", // Romanian
  "Реклама", // Russian
  "Sponzorované", // Slovak
  "Publicidad", // Spanish
  "Sponsrad", // Swedish
  "ได้รับการสนับสนุน", // Thai
  "Sponsorlu", // Turkish
  "Được tài trợ" // Vietnamese
]

var len = 0

function checkSponsored(txt) {
  for (const sponsoredText of sponsoredTexts) {
    if (txt.includes(sponsoredText)) {
      return true
    }
  }
  return false
}
function removeAds() {
  const useElements = document.querySelectorAll('use')
  try {
    for (; len < useElements.length; len++) {
      const link = useElements[len].getAttribute("xlink:href").substring(1)
      const txt = document.querySelector(`text[id=${link}]`).innerHTML
      if (checkSponsored(txt)) {
        useElements[len].closest('div[role]').hidden = true
        // useElements[len].closest('div[role]').style.borderStyle = 'solid'
        // useElements[len].closest('div[role]').style.borderColor = 'red'
      }
    }
  } catch (e) {
    console.log('facebook adblock error:', e)
  }
}
let timer = setInterval(watchfeed, 500);
var i = 0

function watchfeed() {
  const feed = document.querySelector("div[role='feed']")
  if (feed) {
    clearInterval(timer)
    removeAds()
    let feedObserver = new MutationObserver(mutationRecords => {
      mutationRecords.forEach(function (mutation) {
        removeAds()
      });
    });
    feedObserver.observe(feed, { childList: true, subtree: true });
  }
  i++
  if (i >= 20) {
    clearInterval(timer)
  }
  // console.log({ i })
}

watchfeed()