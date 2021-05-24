
const cards = document.querySelectorAll('[id^="img"]') // DOM card placeholders

const arrCards = ['ice-cream', 'waffle', 'pancake', 'donut', 'ice-cream', 'waffle', 'pancake', 'donut'] // Card combination

let matchCard = [] // Selected card pair


function setLevel(level) {
  var freePositions = [0, 1, 2, 3, 4, 5, 6, 7]

  for (let i = 0; i < level.length; i++) {
    var selected = Math.floor(Math.random() * freePositions.length)
    cards[freePositions[selected]].classList.add(level[i])
    cards[freePositions[selected]].style.visibility = 'visible'
    freePositions.splice(selected, 1)
  }

  cards.forEach(elem => {
    elem.onclick = function (e) {
      selectCard(e.currentTarget)
    }
  })
}

setLevel(arrCards)

// ----------------------------------------------

function selectCard(card) {
  matchCard.push(card)
  if (matchCard.length === 2) {
    matchCard[0].style.pointerEvents = 'auto'
    if (matchCard[0].getAttribute('class') === matchCard[1].getAttribute('class')) {
      console.log('coinciden')
      matchCard[0].style.pointerEvents = 'none'
      matchCard[1].style.pointerEvents = 'none'
    } else {
      console.log('no coinciden')
    }
    console.log(matchCard[0])
    matchCard = []
  } else if (matchCard.length === 1) {
    matchCard[0].style.pointerEvents = 'none'
  }
}
// -------------------------------------------------

// function frontCard (elem) {
//   if (elem.target.innerText === '1') {
//     elem.classList.add('ice-cream')
//   }
// }
