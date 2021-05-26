let interval

const cards = document.querySelectorAll('[id^="img"]') // DOM card placeholders
cards.forEach(function (elem) {
  elem.style.pointerEvents = 'none'
})

const arrCards = ['ice-cream', 'waffle', 'pancake', 'donut', 'ice-cream', 'waffle', 'pancake', 'donut'] // Card combination

let matchCard = [] // Selected card pair

const sound = document.getElementById('sound') // variables de sonido
const music = document.getElementById('music')
const play = document.getElementById('btn-play')
const pause = document.getElementById('btn-pause')

let contWinner = 0
let contLoser = 2

const modal = document.getElementById('myModal')
// --------------------------------------------

function setLevel(level) { // damos colores a las cartas
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

function selectCard(card) {
  matchCard.push(card)
  if (matchCard.length === 2) {
    //  matchCard[0].style.pointerEvents = 'auto'
    matchCard[1].classList.toggle('initial')
    if (matchCard[0].getAttribute('class') === matchCard[1].getAttribute('class')) {
      console.log('coinciden')
      contWinner++
      matchCard[0].style.pointerEvents = 'none'
      matchCard[1].style.pointerEvents = 'none'
      if (contWinner === 4) {        
        modalContainer2[0].classList.remove('close')
        modalContainer2[0].classList.add('show')        
        resetLevel(arrCards)
      }
    } else {
      const timerId = setTimeout(flipCards, 500, matchCard)
      console.log('no coinciden')
    }
    console.log(matchCard[0])
    matchCard = []
  } else if (matchCard.length === 1) {
    matchCard[0].style.pointerEvents = 'none'
    matchCard[0].classList.toggle('initial')
  }
}

function flipCards(arr) {
  arr.forEach(elem => {
    elem.classList.toggle('initial')
    if (elem.classList.value.includes('initial')) {
      elem.style.pointerEvents = 'auto'
      console.log('"inital state" - clickable! -->', elem)
    } else { elem.style.pointerEvents = 'none'; console.log('NOT clickable! -->', elem) }
  })
  let speed = 20
  console.log('speed -->', speed)
  if (arr === cards) { interval = setInterval(moveBox, 20) }
}

function resetLevel(timerId) {
  contWinner = 0
  contLoser = 2
  reset(cards)
  clearTimeout(timerId)
  setLevel(arrCards)
  setTimeout(flipCards, 2000, cards)
  characterLeft = 520
  barWidth = 100
}

function reset(arr) {
  arr.forEach(elem => {
    let classes = elem.getAttribute('class').split(' ')
    elem.classList.remove(classes[0])
    if (elem.classList.value !== '') {
      elem.classList.remove('initial')
    }
  })
}

// -------------------------------------------------

const button = document.getElementById('btn-start')
button.onclick = function () {
  setLevel(arrCards)
  const timerId = setTimeout(flipCards, 2000, cards)
  button.style.display ='none'
}

// -------------------
const btnModal = document.getElementById('open-modal')
const btnModalWin = document.getElementById('open-modal2')

const modalContainer = document.getElementsByClassName('modal-container')
const modalContainer2 = document.getElementsByClassName('modal-container2')
const btnReset = document.getElementById('btn-reset')
const btnReset2 = document.getElementById('btn-reset2')

btnReset.addEventListener('click', function () {
  modalContainer[0].classList.add('close')
  modalContainer[0].classList.remove('show')
})

btnReset2.addEventListener('click', function () {
  modalContainer2[0].classList.add('close')
  modalContainer2[0].classList.remove('show')
})

const buttonStart = document.getElementById('btn-start')
buttonStart.onclick = function () {
  setLevel(arrCards)
  const timerId = setTimeout(flipCards, 2000, cards)
}

play.onclick = function () {
  music.play()
}

pause.onclick = function () {
  music.pause()
}

// ------------------------------------------------

const character = document.getElementById('character')
const bar = document.getElementById('fullness-bar')
let characterLeft = 520
let barWidth = character.style.left

const moveBox = function (timerId) {
  if (characterLeft > -20) {
    characterLeft -= 1
  } else {
    clearInterval(interval)
    lose()
  }
  character.style.left = characterLeft + 'px'
  bar.style.width = (parseInt(character.style.left.match(/\d+/)) + 30) + 'px'
}

// -----------------LOSE-FUNCTION-------------------

function lose(timerId) {
  window.alert('LOOOSER!!')
  resetLevel(timerId)
}

resetBar()
