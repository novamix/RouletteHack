class Game {
    constructor(){
        this.plate = document.querySelector('.plate')
        this.timer = 34000
        this.redNumbers = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3]
        this.intervalId = null
        this.numberWin = null
    }

    start(){
        console.log('Cargando...')
        console.log('Hagan sus Apuestas Primera Vez')
        this.lauch()
        this.plate.classList.add('plateRotate')
        this.intervalId = setInterval(() => {
            console.log('Hagan sus Apuestas')
            this.lauch()
        }, this.timer)

    }

    lauch(){
        ball.setAttribute('data-spin', '37')
        setTimeout(() => {
            console.log('No va más')
            this.numberWin = Math.floor(Math.random() * 37)
            ball.setAttribute('data-spin', this.numberWin)
            console.log(this.numberWin)
        }, 15000)
       
    }

    stop(){
        this.plate.classList.remove('plateRotate')
    }
}