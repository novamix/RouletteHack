const game = new Game()
const numbers = document.querySelector('.numbers')
const ball = document.querySelector('.ball')
const startBtn = document.getElementById('btnStart')


window.onload = () => {
    startBtn.addEventListener('click', () => {
        game.start()
    })
}