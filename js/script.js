let interval

const cards = document.querySelectorAll('[id^="img"]') // DOM card placeholders
cards.forEach(function (elem) { // los ponemos a none para no clickar hasta que empiece
  elem.style.pointerEvents = 'none'
})

const arrCards = ['ice-cream', 'waffle', 'pancake', 'donut', 'ice-cream', 'waffle', 'pancake', 'donut'] // Card combination

let matchCard = [] // Selected card pair

let sound = document.getElementById('sound') // variables de sonido
let music = document.getElementById('music')
let play = document.getElementById('sound-button')

let contWinner = 0

const modal = document.getElementById('myModal')
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
    matchCard[1].classList.toggle('initial')
    if (matchCard[0].getAttribute('class') === matchCard[1].getAttribute('class')) {
      contWinner++
      matchCard[0].style.pointerEvents = 'none'
      matchCard[1].style.pointerEvents = 'none'
      if (contWinner === 4) {
        modalContainer2[0].classList.remove('close')
        modalContainer2[0].classList.add('show')
        resetRacoon()
        clearInterval(interval)
      }
    } else {
      const timerId = setTimeout(flipCards, 500, matchCard)
    }
    matchCard = []
  } else if (matchCard.length === 1) {
    matchCard[0].style.pointerEvents = 'none'
    matchCard[0].classList.toggle('initial')
  }
}

function flipCards (arr) {
  arr.forEach(elem => {
    elem.classList.toggle('initial')
    if (elem.classList.value.includes('initial')) {
      elem.style.pointerEvents = 'auto'
    } else { elem.style.pointerEvents = 'none' }
  })
  if (arr === cards) { interval = setInterval(moveBox, 20) }
}

function resetLevel (timerId) {
  characterLeft = 520
  cards.forEach(function (elem) { elem.style.pointerEvents = 'auto' })
  contWinner = 0
  reset(cards)
  clearTimeout(timerId)
  setLevel(arrCards)
  setTimeout(flipCards, 2000, cards)
}

function reset (arr) {
  arr.forEach(elem => {
    const classes = elem.getAttribute('class').split(' ')
    elem.classList.remove(classes[0])
    if (elem.classList.value !== '') {
      elem.classList.remove('initial')
    }
  })
}

// -------------------------------------------------

music.play()
var muted = false
play.classList.add('sound-on')

const btnStart = document.getElementById('btn-start')

btnStart.onclick = function () {
  setLevel(arrCards)
  const timerId = setTimeout(flipCards, 2000, cards)
  btnStart.style.display = 'none'
}

// --------------------------------------------

const modalContainer = document.getElementsByClassName('modal-container') // game -over
const modalContainer2 = document.getElementsByClassName('modal-container2') // you win
const modalCover = document.getElementsByClassName('modal-container-cover') // cover

const btnResetGameOver = document.getElementById('btn-reset')
const btnResetWin = document.getElementById('btn-reset2')

btnResetGameOver.addEventListener('click', function () {
  modalContainer[0].classList.add('close')
  modalContainer[0].classList.remove('show')
  resetLevel(cards)
})

btnResetWin.addEventListener('click', function () {
  modalContainer2[0].classList.add('close')
  modalContainer2[0].classList.remove('show')
  resetLevel(cards)
})

play.onclick = function () {
  music.play()
}

play.onclick = function () {
  muted = !muted
  if (muted) {
    play.classList.remove('sound-off')
    play.classList.add('sound-on')
    music.play()
  } else {
    music.pause()
    play.classList.remove('sound-on')
    play.classList.add('sound-off')
  }
}

// ------------------------------------------------
// funcion que resetee el muñeco y la barra

const character = document.getElementById('character')
const bar = document.getElementById('fullness-bar')
let characterLeft = 520
const barWidth = character.style.left

const moveBox = function (timerId) {
  if (characterLeft > -20) {
    characterLeft -= 1
  } else {
    clearInterval(interval)
    modalLose()
  }
  character.style.left = characterLeft + 'px'
  bar.style.width = (parseInt(character.style.left.match(/\d+/)) + 30) + 'px'
}

function resetRacoon () {
  character.style.left = 520 + 'px'
  bar.style.width = (parseInt(character.style.left.match(/\d+/)) + 30) + 'px'
}
// -----------------LOSE-FUNCTION-------------------

function modalLose (timerId) {
  characterLeft = 520
  modalContainer[0].classList.remove('close')
  modalContainer[0].classList.add('show')
}

// -------------------------
const btnPlayCover = document.getElementById('btn-cover')

btnPlayCover.onclick = function () {
  modalCover[0].classList.remove('show')
  modalCover[0].classList.add('close')
}
