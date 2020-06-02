const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]') /* selects all data cells*/
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton') /* sets restart */
const winningMessageTextElement = document.querySelector('[data-winning-message-text]') /* winning message */
let circleTurn

startGame()

/* starts new game upon click */
restartButton.addEventListener('click', startGame)

/* starts game and hover class */
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS) /* X */
    cell.classList.remove(CIRCLE_CLASS) /* O */
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

/* places mark only once, checks for wins/draw & switches turns */
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS /* ternary, if not O its X */
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns() /* swaps turns if no winner */
    setBoardHoverClass()
  }
}
/* defines Draw or selects win message */
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw, what an anticlimax...'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "0 is the Hero!" : "X is the Best!"}`
  }
  winningMessageElement.classList.add('show')
}
/* defines draw  */
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

/* places mark */
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

/* swaps turn, take's opposite of circleTurn */
function swapTurns() {
  circleTurn = !circleTurn
}

/* hover based on who's turn it currently is with accurate marker */
function setBoardHoverClass() {
  board.classList.remove(X_CLASS) /* removes X*/
  board.classList.remove(CIRCLE_CLASS) /* removes O */
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

/* checks all combinations for win by looping through all possible wins  */
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
