const img1 = document.getElementById('img1')

const cards = document.querySelectorAll('[id^="img"]')

// console.log(cards)

// evento on click
function cardsClick (cards) {
  cards.forEach(elem => {
    elem.onclick = function (e) {
      selectCard(e.target)
    }
  })
}
const level1 = ['1', '2', '1', '2']
const level2 = ['1', '2', '3', '4', '1', '2', '3', '4']
const level3 = ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']

const cardsLevel1 = []
// enseñar cartas necesarias segun nivel
let positionArray = []
function setLevel (arr) {
  const copy = arr.slice(0, arr.length)
  positionArray = []
  for (let i = 0; i < arr.length; i++) {
    positionArray.push(cards[i])
    cardsLevel1.push(cards[i])

    cards[i].style.visibility = 'visible'
    const randomCard = Math.floor(Math.random() * copy.length)
    cards[i].childNodes[0].innerText = copy[randomCard]
    copy.splice(randomCard, 1)
  }

  cardsClick(cardsLevel1)
}
setLevel(level2)
// ----------------------------------------------

let matchCard = []

function selectCard (card) {
  matchCard.push(card)
  console.log(matchCard)
  if (matchCard.length === 2) {
    matchCard[0].style.pointerEvents = 'auto'
    if (matchCard[0] !== matchCard[1]) {
      if (matchCard[0].innerText === matchCard[1].innerText) {
        console.log('coinciden')
      } else {
        console.log('no coinciden')
      }
    } else {
      console.log('pulsa otra carta')
    }
    console.log(matchCard[0])
    matchCard = []
  } else if (matchCard.length === 1){
    matchCard[0].style.pointerEvents = 'none'
  }
}
