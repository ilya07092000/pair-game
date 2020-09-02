let cardsField = document.querySelector('.cards__content');
let restartBtn = document.querySelector('.restart');

let done = document.createElement('img');
done.className = 'done';
done.src = './img/check-solid.svg';

class gameDeck {
    constructor() {
        this.cards = [
            {icon: './img/apple-alt-solid.svg', id: 'apple'},
            {icon: './img/apple-alt-solid.svg', id: 'apple'},
            {icon: './img/bitcoin-brands.svg', id: 'bitcoin'},
            {icon: './img/bitcoin-brands.svg', id: 'bitcoin'},
            {icon: './img/book-solid.svg', id: 'book'},
            {icon: './img/book-solid.svg', id: 'book'},
            {icon: './img/car-side-solid.svg', id: 'car'},
            {icon: './img/car-side-solid.svg', id: 'car'},
            {icon: './img/envelope-regular.svg', id: 'envelope'},
            {icon: './img/envelope-regular.svg', id: 'envelope'},
            {icon: './img/linux-brands.svg', id: 'linux'},
            {icon: './img/linux-brands.svg', id: 'linux'},
        ];
        this.counter = 0;
        this.openedCard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.lock = false;
    };

    sortCards() {
        this.cards.sort(() => Math.random() - 0.5);
        this.cards.sort(() => Math.random() - 0.5);
    };

    makeCards() {
        this.cards.forEach(item => {
            let card = document.createElement('div');
            card.className = 'cards__item';
            card.setAttribute("data-id", `${item.id}`);
            card.innerHTML = `
                <div class="cards__item__back">

                </div>
                <div class="cards__item__front">
                    <img class="cards__item__icon" src="${item.icon}" alt="">
                </div>
            `;
            card.addEventListener('click', this.choseCart);
            cardsField.appendChild(card);
        })
    };

    choseCart() {
        if(!game.lock) {
            this.classList.add('open');
            if(!game.openedCard) {
                game.openedCard = true;
                game.firstCard = this;
                return;
            } else if(game.firstCard != this) {
                game.secondCard = this;
                game.lock = true;
                game.checkCards();
            };
        }
    };

    checkCards() {
        if(this.firstCard.dataset.id === this.secondCard.dataset.id) {
            this.markCards();
        } else {
            setTimeout(this.closeCards, 1000);
        }
    };

    markCards() {
        this.firstCard.innerHTML += `
            <img class="done" src="./img/check-solid.svg">
        `;
        this.secondCard.innerHTML += `
            <img class="done" src="./img/check-solid.svg">
        `;
        this.firstCard.removeEventListener('click', this.choseCart);
        this.secondCard.removeEventListener('click', this.choseCart);
        this.firstCard.classList.add('guessed');
        this.secondCard.classList.add('guessed');
        game.openedCard = false;
        game.lock = false;
    }

    closeCards() {
        let opened = document.querySelectorAll('.open');
        opened.forEach(i => i.classList.remove('open'));
        this.firstCard = null;
        this.secondCard = null;
        game.openedCard = false;
        game.lock = false;
    }

    init() {
        cardsField.innerHTML = '';
        this.sortCards();
        this.makeCards();
    };
}

let game = new gameDeck();
game.init();

restartBtn.addEventListener('click', e => game.init());