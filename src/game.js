import { getRandomNumber } from './utils/get-random-number.js'

/**
 * Create a game instance.
 * @param {Object} options
 * @param {number} options.min
 * @param {number} options.max
 */
export function createGame(options) {
  const state = {
    min: options?.min ?? 0,
    max: options?.max ?? 10,
    attempt: 0,
  }

  let randomNumber = getRandomNumber(state.min, state.max)

  const screenOne = document.querySelector('.screen1')
  const screenTwo = document.querySelector('.screen2')
  const inputNumber = document.querySelector('#input-number')
  const btnTry = document.querySelector('#btn-try')
  const btnRestart = document.querySelector('#btn-restart')

  btnTry.addEventListener('click', handleTryClick)
  btnRestart.addEventListener('click', handleResetClick)

  screenOne
    .querySelector('p')
    .innerText = `Adivinhe o número entre ${state.min} e ${state.max}`

  function handleTryClick(event) {
    event.preventDefault()

    let response = inputNumber.value

    if (!response) {
      alert('Insira um número!')
      return
    }

    response = Number(response)
    const isValidInputNumber = response >= state.min && response <= state.max

    if (!isValidInputNumber) {
      alert(`Insira um número entre ${state.min} e ${state.max}`)
      inputNumber.value = ''
      return
    }

    state.attempt++

    let isSameNumber = response === randomNumber

    if (isSameNumber) {
      toggleScreen()

      screenTwo
        .querySelector('h2')
        .innerText = `Acertou em ${state.attempt} tentativas!`
    } else {
      wrongAnswer()
    }

    inputNumber.value = ''
  }

  function handleResetClick(event) {
    if (event.target) {
      event.preventDefault()
    }

    reset()
  }

  function reset() {
    toggleScreen()

    randomNumber = getRandomNumber(state.min, state.max)
    state.attempt = 0
  }

  function wrongAnswer() {
    const form = screenOne.querySelector('form')
    const wrongClassName = 'wrong-answer'
    const timeoutInMilliseconds = 1000 * 0.8 // 800ms

    form.classList.add(wrongClassName)
    inputNumber.disabled = true

    setTimeout(() => {
      form.classList.remove(wrongClassName)
      inputNumber.disabled = false
      inputNumber.focus()
    }, timeoutInMilliseconds)
  }

  function toggleScreen() {
    document.querySelector('.screen1').classList.toggle('hide')
    screenTwo.classList.toggle('hide')
  }

  /**
   * @param {Object} params
   * @param {string} params.keyPressed
   */
  function hotKeys(params) {
    const acceptedKeys = {
      Enter() {
        const isScreenOneHidden = screenOne.classList.contains('hide')

        if (isScreenOneHidden) {
          reset()
        }
      }
    }

    const keyFunction = acceptedKeys[params.keyPressed]

    if (keyFunction) {
      keyFunction()
    }
  }

  return {
    hotKeys,
  }
}
