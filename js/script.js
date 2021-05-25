
const cards = document.querySelectorAll('[id^="img"]') // DOM card placeholders

const arrCards = ['ice-cream', 'waffle', 'pancake', 'donut', 'ice-cream', 'waffle', 'pancake', 'donut'] // Card combination

let matchCard = [] // Selected card pair

let sound = document.getElementById('sound') // variables de sonido
let music = document.getElementById('music')
let play = document.getElementById('btn-play')
let pause = document.getElementById('btn-pause')

let contWinner = 0
let contLoser = 2

// --------------------------------------------

function setLevel (level) { // damos colores a las cartas
  const freePositions = [0, 1, 2, 3, 4, 5, 6, 7]

  for (let i = 0; i < level.length; i++) {
    const selected = Math.floor(Math.random() * freePositions.length)
    cards[freePositions[selected]].classList.add(level[i])
    cards[freePositions[selected]].style.visibility = 'visible'
    freePositions.splice(selected, 1)
  }

  cards.forEach(elem => {
    elem.onclick = function (e) {
      selectCard(e.currentTarget)
      sound.play()
    }
  })
}

// ----------------------------------------------

function selectCard (card) {
  matchCard.push(card)
  if (matchCard.length === 2) {
    matchCard[0].style.pointerEvents = 'auto'
    matchCard[1].classList.toggle('initial')
    if (matchCard[0].getAttribute('class') === matchCard[1].getAttribute('class')) {
      console.log('coinciden')
      contWinner++
      if (contWinner === 4) {
        window.alert('WINNEEER!!!')
      }
      matchCard[0].style.pointerEvents = 'none'
      matchCard[1].style.pointerEvents = 'none'
    } else {
      let timerId = setTimeout(flipCards, 500, matchCard)
      console.log('no coinciden')
      contLoser--
      if (contLoser === 0) {
        window.alert('LOOOSER!!')
        resetLevel(timerId)
      }
    }
    console.log(matchCard[0])
    matchCard = []
  } else if (matchCard.length === 1) {
    matchCard[0].style.pointerEvents = 'none'
    matchCard[0].classList.toggle('initial')
  }
}

function flipCards (arr) {
  arr.forEach(elem => {
    elem.classList.toggle('initial')
  })
}

function resetLevel (timerId) {
  contWinner = 0
  contLoser = 2
  reset(cards)
  clearTimeout(timerId)
  setLevel(arrCards)
  setTimeout(flipCards, 2000, cards)
}

function reset (arr) {
  arr.forEach(elem => {
    var classes = elem.getAttribute('class').split(' ')
    elem.classList.remove(classes[0])
    if (elem.classList.value !== '') {
      elem.classList.remove('initial')
    }
  })
}

// -------------------------------------------------

let button = document.getElementById('btn-start')
button.onclick = function () {
  var interval = setInterval(moveBox, 20)
  setLevel(arrCards)
  let timerId = setTimeout(flipCards, 2000, cards)
}

play.onclick = function () {
  music.play()
}

pause.onclick = function () {
  music.pause()
}

// ------------------------------------------------

let character = document.getElementById('character')
let characterLeft = 520;

const moveBox = function () {
  if (characterLeft > -20 ) {
    characterLeft -= 1
  }
  character.style.left = characterLeft+'px'
}