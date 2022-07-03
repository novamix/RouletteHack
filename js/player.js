class Player {
    constructor(money) {
        this.money = localStorage.getItem('money') ? localStorage.getItem('money') : 4000  // dinero que tengo
        this.staked = 0; // cantidad apostada
        this.coin = 1; 
        this.bets = {}; // numeros apostados y cantidad de monedas
        this.coinsImage = {
            1: '../img/coins/1/flip-v02-512.png',
            5: '../img/coins/5/flip-v02-512.png',
            25: '../img/coins/25/flip-v02-512.png',
            100: '../img/coins/100/flip-v02-512.png',
            500: '../img/coins/500/flip-v02-512.png',
        }
    }
  
    selectCoin(c) {
        this.coin = Number(c);
    }

    betNumber(number) {
        if (!game.statusGame && this.money > 0 && this.staked < this.money && this.coin <= (this.money - this.staked)) {
            this.bets[number.dataset.number] = this.bets[number.dataset.number] || {
                1: 0,
                5: 0,
                25: 0,
                100: 0,
                500: 0,
                total: 0
            };
            this.bets[number.dataset.number][this.coin]++;
            this.bets[number.dataset.number].total += this.coin;
    
    
            this.staked += this.coin;

            let newNumber = document.createElement('img')
            newNumber.src = this.coinsImage[this.coin]
            newNumber.classList.add('bet')
            newNumber.classList.add('bet-' + this.coin)
            number.appendChild(newNumber)

            if(this.bets[number.dataset.number][1] === 5) {
                this.bets[number.dataset.number][1] = 0;
                this.bets[number.dataset.number][5]++;
                for (const img of number.querySelectorAll('.bet-1')) {
                    img.remove()
                }
                let newNumber = document.createElement('img')
                newNumber.src = this.coinsImage[5]
                newNumber.classList.add('bet')
                newNumber.classList.add('bet-5')
                number.appendChild(newNumber)
            }
            if(this.bets[number.dataset.number][5] === 5) {
                this.bets[number.dataset.number][5] = 0;
                this.bets[number.dataset.number][25]++;
                for (const img of number.querySelectorAll('.bet-5')) {
                    img.remove()
                }
                let newNumber = document.createElement('img')
                newNumber.src = this.coinsImage[25]
                newNumber.classList.add('bet')
                newNumber.classList.add('bet-25')
                number.appendChild(newNumber)
            }
            if(this.bets[number.dataset.number][25] === 4) {
                this.bets[number.dataset.number][25] = 0;
                this.bets[number.dataset.number][100]++;
                for (const img of number.querySelectorAll('.bet-25')) {
                    img.remove()
                }
                let newNumber = document.createElement('img')
                newNumber.src = this.coinsImage[100]
                newNumber.classList.add('bet')
                newNumber.classList.add('bet-100')
                number.appendChild(newNumber)
            }
            if(this.bets[number.dataset.number][100] === 4) {
                this.bets[number.dataset.number][100] = 0;
                this.bets[number.dataset.number][500]++;
                for (const img of number.querySelectorAll('.bet-100')) {
                    img.remove()
                }
                let newNumber = document.createElement('img')
                newNumber.src = this.coinsImage[500]
                newNumber.classList.add('bet')
                newNumber.classList.add('bet-500')
                number.appendChild(newNumber)
            }
            document.querySelector('.staked').textContent = game.formatter.format(this.staked)
        } else  {
            document.querySelector('.noCoinsMessage').style.display = 'block'
            setTimeout(() => {
                document.querySelector('.noCoinsMessage').style.display = 'none'
            }, 1000)
        }
    }

    clearBets(){
        this.staked = 0 
        this.bets = {}
        for (const img of document.querySelectorAll('.bet')) {
            img.remove()
        }
        document.querySelector('.staked').textContent = game.formatter.format(this.staked)
    }
}


