
let deckID
let cardPosition = 0;



const newTryBtn = document.getElementById('newTry')

const cardsLeft = document.getElementById('cardsLeft')
let cardsRemaining
const newCardBtn = document.getElementById('newCard')
const checkBtn = document.getElementById('check')
let card = document.getElementById('card')
const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
let cardsArray = []


newTryBtn.addEventListener('click', getNewDeck)
function getNewDeck() {
    card.innerHTML = `
    <img src="img/playing-card-568200_640.jpg" alt="">
    `
    cardsArray = []
    cardsLeft.textContent = cardsArray.length
    cardPosition = 0;
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            setButton()
            // cardsRemaining = data.remaining
            // cardsLeft.innerHTML = `Noch ${cardsRemaining} Karten übrig`
            // console.log(cardsRemaining)

            deckId = data.deck_id


        })



}
newCardBtn.addEventListener('click', newCard)

function newCard() {
    console.log(deckId)
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            cardsArray.push(data.cards[0].image)
            console.log(cardsArray)
            card.innerHTML = `
        <img src=${data.cards[0].image}>
        `
            cardsLeft.textContent = cardsArray.length

            if (cardsArray.length === 10) {
                newCardBtn.disabled = true;
                checkBtn.disabled = false;
                document.getElementById('span-cards-left').classList.add('display-none')
                cardsLeft.innerHTML = `
            <span>Ende des Durchgangs</span>
        `
            }



        })
}
function saveArray() {
    if (cardsRemaining === 42) {
        cardsArray
    }
}

function setButton() {
    newCardBtn.disabled = false;
    if (cardsRemaining === 0) {
        newCardBtn.disabled = true;
    }
}
checkBtn.addEventListener('click', checkCards)

function checkCards() {

    card.innerHTML = `
    <img src="${cardsArray[cardPosition]}" alt="">
    `
    cardPosition++
    document.getElementById('span-cards-left').classList.remove('display-none')
    cardsLeft.textContent = cardPosition
    if(cardPosition === 10) {
        checkBtn.disabled = true;
    }
}