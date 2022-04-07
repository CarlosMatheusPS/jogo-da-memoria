let game = {

    lockmode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockmode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockmode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockmode = false;
    },
    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card=>!card.flipped).length == 0;
    },

    figures: [
        "alien",
        "coracao",
        "fogo",
        "foguete",
        "fruta",
        "idoso",
        "leao",
        "livro",
        "pipoca",
        "teatro",
    ],

    cards: null,

    createCardsFromFigures: function () {
        this.cards = [];

        this.figures.forEach((figure) => {
            this.cards.push(this.createPairFromFigure(figure));
        })

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromFigure: function (figure) {
        return [{
            id: this.createIdWithFigure(figure),
            icon: figure,
            flipped: false,
        }, {
            id: this.createIdWithFigure(figure),
            icon: figure,
            flipped: false,
        }]
    },

    createIdWithFigure: function (figure) {
        return figure + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
        return cards
    },
}

