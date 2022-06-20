const game = new Game()
const numbers = document.querySelector('.numbers')
const startBtn = document.getElementById('btnStart')


window.onload = () => {
    startBtn.addEventListener('click', () => {
        game.start()
    })
}