class Game {
    constructor(){
        this.plate = document.querySelector('.plate')
        this.timer = 34000
        this.redNumbers = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3]
        this.intervalId = null
        this.numberWin = null
        this.player = new Player()
        this.statusGame = false
    }


    start(){
        document.querySelector('.money').textContent = this.player.money
        console.log('Cargando...')
        console.log('Hagan sus Apuestas Primera Vez')
        this.lauch()
        this.plate.classList.add('plateRotate')
        this.intervalId = setInterval(() => {
            this.statusGame = false
            for (const img of document.querySelectorAll('.bet')) {
                img.remove()
            }
            this.player.bets = {}
            this.player.staked = 0
            document.querySelector('.staked').textContent = this.player.staked
            console.log('Hagan sus Apuestas')
            this.lauch()
        }, this.timer)

    }

    lauch(){
        ball.setAttribute('data-spin', '37')
        setTimeout(() => {
            setTimeout(() => {
                console.log('No va más')
                this.statusGame = true
                this.player.money -= this.player.staked
                document.querySelector('.money').textContent = this.player.money
            }, 3000)
            this.numberWin = Math.floor(Math.random() * 37)
            ball.setAttribute('data-spin', this.numberWin)
            setTimeout(() => {
                this.lastBall()
            }, 9000)
            this.player.checkWin(this.numberWin)
        }, 15000)
       
    }

    lastBall() {
        console.log(document.querySelectorAll('.last-ball').length)
        if(document.querySelectorAll('.last-ball').length > 6) {
            document.querySelector('.last-ball').remove()
        }
    
        let lastBall = document.createElement('div')
        lastBall.classList.add('last-ball')

        // si esta en el array de redNumbers añade ball-red
        if(this.redNumbers.includes(this.numberWin)){
            lastBall.classList.add('ball-red')
        } else if (this.numberWin === 0){
            lastBall.classList.add('ball-green')
        }
        else {
            lastBall.classList.add('ball-blue')
        }
        let number = document.createElement('p')
        number.textContent = this.numberWin
        lastBall.appendChild(number)
        document.querySelector('.last-numbers').appendChild(lastBall)
    }

    stop(){
        this.plate.classList.remove('plateRotate')
    }
}