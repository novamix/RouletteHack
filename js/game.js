class Game {
    constructor(){
        this.plate = document.querySelector('.plate')
        this.timer = 9000
        this.redNumbers = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3]
        this.intervalId = null
        this.numberWin = null
    }

    start(){
        this.plate.classList.add('plateRotate')
        this.intervalId = setInterval(() => {
           this.lauch()
        }, this.timer)

    }

    lauch(){
        this.numberWin = Math.floor(Math.random() * 37)
        numbers.setAttribute('data-spin', this.numberWin)
    }

    stop(){
        this.plate.classList.remove('plateRotate')
    }
}