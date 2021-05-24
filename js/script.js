const img1 = document.getElementById('img1')
let level = 1

const cards = document.querySelectorAll('[id^="img"]')

console.log(cards)

// evento on click
function cardsClick (cards) {
  cards.forEach(elem => {
    elem.onclick = function (e) {
      console.log(e.target)
    }
  })
}
var arrCartas = ['1', '2', '3', '4', '1', '2', '3', '4']
let cardsLevel1 = []
// enseñar cartas necesarias segun nivel
function setLevel (num) {
  if (level === 1) {
    var copy = arrCartas.slice(0, num)
    for (let i = 0; i < num; i++) {

      cardsLevel1.push(cards[i])
      console.log(cards[i])
      cards[i].style.visibility = 'visible'
      var randomCard = Math.floor(Math.random() * copy.length)
      cards[i].childNodes[0].innerText = copy[randomCard]
      copy.splice(randomCard, 1)
    }
    
    
    cardsClick(cardsLevel1)
  }
}
setLevel(8)


//cards[0].childNodes[0].innerText = '13'
