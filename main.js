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
const suggestedTexts = ["Suggested for you",
  "הצעות בשבילך", //Hebrew
  "Рекомендация для вас", //Russian

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
function removeAds(feed) {
  const useElements = document.querySelectorAll('use')
  try {
    for (; len < useElements.length; len++) {

      const link = useElements[len].getAttribute("xlink:href").substring(1)
      const txt = document.querySelector(`text[id=${link}]`)?.innerHTML
      if (txt && checkSponsored(txt)) {
        useElements[len].closest(`div[class=""]`).hidden = true
        // useElements[len].closest(`div[class=""]`).style.borderStyle = 'solid'
        // useElements[len].closest(`div[class=""]`).style.borderColor = 'red'
        continue;
      }
      useElements[len]?.closest(`div[class=""]`)?.querySelectorAll(`div[role="button"]`)?.forEach(x => {
        if (checkSponsored(x.innerHTML)) {
          useElements[len].closest(`div[class=""]`).hidden = true
          // useElements[len].closest(`div[class=""]`).style.borderStyle = 'solid'
          // useElements[len].closest(`div[class=""]`).style.borderColor = 'red'
        }
      })
    }
  } catch (e) {
    console.log('facebook adblock error:', e)
  }
}
var i = 0

function watchfeed() {
  let feed = ""
  document.querySelectorAll(`h3[dir='auto']`)?.forEach(el => {
    if (el.nextSibling?.className === "") {
      feed = el.nextSibling
    }
  })
  if (feed) {
    clearInterval(timer)
    removeAds(feed)
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
}
let timer = setInterval(watchfeed, 500);
watchfeed()