
const cards = document.querySelectorAll('[id^="img"]') // DOM card placeholders

const arrCards = ['ice-cream', 'waffle', 'pancake', 'donut', 'ice-cream', 'waffle', 'pancake', 'donut'] // Card combination

let matchCard = [] // Selected card pair

let contWinner = 0
let contLoser = 2

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
        // window.alert('WINNEEER!!!')
        modalContainer2[0].classList.remove('close')
        modalContainer2[0].classList.add('show')
      }
      matchCard[0].style.pointerEvents = 'none'
      matchCard[1].style.pointerEvents = 'none'
    } else {
      const timerId = setTimeout(flipCards, 500, matchCard)
      console.log('no coinciden')
      contLoser--
      if (contLoser === 0) {
        // window.alert('LOOOSER!!')
        modalContainer[0].classList.remove('close')
        modalContainer[0].classList.add('show')
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
  console.log('por aqui')
  contWinner = 0
  contLoser = 2
  reset(cards)
  clearTimeout(timerId)
  setLevel(arrCards)
  setTimeout(flipCards, 2000, cards)
}

function reset (arr) {
  console.log('por aca')
  arr.forEach(elem => {
    const classes = elem.getAttribute('class').split(' ')
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
// ----- btn-modal que se va pronto
// btnModal.addEventListener('click', function () {
//   modalContainer[0].classList.remove('close')
//   modalContainer[0].classList.add('show')
// })
// btnModalWin.addEventListener('click', function(){
//   modalContainer2[0].classList.remove('close')
//   modalContainer2[0].classList.add('show')
// })