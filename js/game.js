class Game {
    constructor() {
        this.plate = document.querySelector('.plate')
        this.place = document.querySelector('.place')
        this.placeTexts = document.querySelectorAll('.text-place')
        this.moneyText = document.querySelector('.money')
        this.win = document.querySelector('.win')
        this.timer = 34000
        this.redNumbers = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3]
        this.intervalId = null
        this.numberWin = null
        this.player = new Player()
        this.statusGame = false
        this.winMoney = 0
        this.formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
        this.gameStart = false
    }

    start() {
        if (this.player.money <= 0 && localStorage.getItem('money')) {
            this.player.money = 1000
        }
        this.moneyText.textContent = this.formatter.format(this.player.money)
        this.win.style.display = 'none'
        this.changeText('Place Your Bets')
        this.statusGame = false
        this.plate.classList.add('plateRotate')
        for (const img of document.querySelectorAll('.bet')) {
            img.remove()
        }
        this.player.bets = {}
        this.player.staked = 0
        this.winMoney = 0
        document.querySelector('.staked').textContent = this.formatter.format(this.player.staked)
        this.changeText('Place Your Bets')

        setTimeout(() => {
            this.place.style.display = 'none'
        }, 1000)
        ball.setAttribute('data-spin', '37')

        
        setTimeout(() => {
            this.lauch()
        }, 15000)
    }

    lauch() {
        setTimeout(() => {
            this.changeText('No More')
            setTimeout(() => {
                this.place.style.display = 'none'
            }, 1000)

            this.statusGame = true
            this.player.money -= this.player.staked
            localStorage.setItem('money', this.player.money)
            this.moneyText.textContent = this.formatter.format(this.player.money)
        }, 3000)
        this.numberWin = Math.floor(Math.random() * 37)

        const myNode = document.querySelector('[data-hole="' + this.numberWin + '"]')
        const positionHole = setInterval(() => {
            if (
                myNode.getBoundingClientRect().y > -400 && 
                myNode.getBoundingClientRect().y < 0 && 
                myNode.getBoundingClientRect().x > window.innerWidth / 2
            ) {
                clearInterval(positionHole)
                ball.setAttribute('data-spin', this.numberWin)
                setTimeout(() => {
                    this.lastBall()
                    this.checkWin(this.numberWin)
                    this.changeText(`You Win: ${this.winMoney}€`, true)
                    this.moneyText.textContent = this.formatter.format(this.player.money)
                    localStorage.setItem('money', this.player.money)
                    setTimeout(() => {
                        this.place.style.display = 'none'
                        this.start()
                    }, 4000)
                }, 7000)
            }
        }, 200)
    }

    lastBall() {
        if (document.querySelectorAll('.last-ball').length > 6) {
            document.querySelector('.last-ball').remove()
        }

        let lastBall = document.createElement('div')
        lastBall.classList.add('last-ball')

        // si esta en el array de redNumbers añade ball-red
        if (this.redNumbers.includes(this.numberWin)) {
            lastBall.classList.add('ball-red')
        } else if (this.numberWin === 0) {
            lastBall.classList.add('ball-green')
        } else {
            lastBall.classList.add('ball-blue')
        }
        let number = document.createElement('p')
        number.textContent = this.numberWin
        lastBall.appendChild(number)
        document.querySelector('.last-numbers').appendChild(lastBall)
    }

    stop() {
        this.plate.classList.remove('plateRotate')
    }

    checkWin(number) {
        // Directa
        if (this.player.bets[number]) {
            this.winMoney += this.player.bets[number].total * 36
        }

        for (const bets in this.player.bets) {
            if (bets.includes(',')) {
                let betsArr = bets.split(',')
                // adyacentes
                if (betsArr.length === 2) {
                    betsArr.forEach(bet => {
                        if (bet == number) {
                            this.winMoney += this.player.bets[bets].total * 18
                        }
                    })
                }
                if (betsArr.length === 4) {
                    betsArr.forEach(bet => {
                        if (bet == number) {
                            this.winMoney += this.player.bets[bets].total * 9
                        }
                    })
                }
            }
            // Filas
            if (bets.includes('2to1-1')) {
                let n = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
                if (n.includes(number)) {
                    this.winMoney += this.player.bets['2to1-1'].total * 2
                }
            }
            if (bets.includes('2to1-2')) {
                let n = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
                if (n.includes(number)) {
                    this.winMoney += this.player.bets['2to1-2'].total * 2
                }
            }
            if (bets.includes('2to1-3')) {
                let n = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
                if (n.includes(number)) {
                    this.winMoney += this.player.bets['2to1-3'].total * 2
                }
            }
            // Secuenciales ( 1 a 12 , 13 a 24, 25 a 36)

            if (bets.includes('1to12')) {
                if (number >= 1 && number <= 12) {
                    this.winMoney += this.player.bets['1to12'].total * 3
                }
            }
            if (bets.includes('13to24')) {
                if (number >= 13 && number <= 24) {
                    this.winMoney += this.player.bets['13to24'].total * 3
                }
            }
            if (bets.includes('25to36')) {
                if (number >= 25 && number <= 36) {
                    this.winMoney += this.player.bets['25to36'].total * 3
                }
            }

            // Secuenciales (1 a 18, 19 a 36)
            if (bets.includes('1to18')) {
                if (number >= 1 && number <= 18) {
                    this.winMoney += this.player.bets['1to18'].total * 2
                }
            }
            if (bets.includes('19to36')) {
                if (number >= 19 && number <= 36) {
                    this.winMoney += this.player.bets['19to36'].total * 2
                }
            }
            // Even
            if (bets.includes('even')) {
                if (number % 2 === 0) {
                    this.winMoney += this.player.bets['even'].total * 2
                }
            }

            // Odd
            if (bets.includes('odd')) {
                if (number % 2 !== 0) {
                    this.winMoney += this.player.bets['odd'].total * 2
                }
            }

            // Red
            if (bets.includes('red')) {
                if (this.redNumbers.includes(number)) {
                    this.winMoney += this.player.bets['red'].total * 2
                }
            }

            // Black
            if (bets.includes('black')) {
                if (!this.redNumbers.includes(number)) {
                    this.winMoney += this.player.bets['black'].total * 2
                }
            }
        }
        this.player.money += this.winMoney
    }

    changeText(text, win) {
        if (win) {
            this.win.querySelector('p').textContent = this.formatter.format(this.winMoney)
            this.win.querySelector('h2').textContent = this.numberWin
            this.win.classList.remove('win-red', 'win-green', 'win-blue')
            if (this.redNumbers.includes(this.numberWin)) {
                this.win.classList.add('win-red')
            } else if (this.numberWin === 0) {
                this.win.classList.add('win-green')
            } else {
                this.win.classList.add('win-blue')
            }
            this.win.style.display = 'block'
            setTimeout(() => {
                this.win.style.display = 'none'
            }, 5000)
        } else {
            for (const t of this.placeTexts) {
                t.textContent = text
            }
            this.place.style.display = 'flex'
            setTimeout(() => {
                this.place.style.display = 'none'
            }, 1000)
        }
    }
}
