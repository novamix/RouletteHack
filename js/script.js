const game = new Game()
const numbers = document.querySelector('.numbers')
const ball = document.querySelector('.ball')
const startBtn = document.getElementById('btnStart')



window.onload = () => {
    game.start()

    document.querySelectorAll('.coin').forEach(coin => {
        coin.addEventListener('click', () => {
            game.player.selectCoin(coin.dataset.coin)
            document.querySelector('.coin-active').classList.remove('coin-active')
            coin.classList.add('coin-active')
        })
    });

    document.querySelectorAll('[data-number]').forEach(number => {
        number.addEventListener('click', () => {
            game.player.betNumber(number)
        })
    })
}