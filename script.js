let deckID

const newTryBtn = document.getElementById('newTry')

const cardsLeft = document.getElementById('cardsLeft')
let cardsRemaining
const newCardBtn = document.getElementById('newCard')
let card = document.getElementById('card')
const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"

]
let cardsArray = []

newTryBtn.addEventListener('click', getNewDeck)
function getNewDeck() {
    console.log('button works')
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
        setButton()
        cardsRemaining = data.remaining
        cardsLeft.innerHTML = `Noch ${cardsRemaining} Karten übrig`
        console.log(cardsRemaining)
        
        deckId = data.deck_id
        console.log(deckId)
    
    
    })

    

}
newCardBtn.addEventListener('click', newCard)

function newCard() {
    console.log(deckId)
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(data => {
        cardsArray.push(data.cards[0].value)
        card.innerHTML = `
        <img src=${data.cards[0].image}>
        `
        console.log(cardsArray)

    })
}
function saveArray() {
    if(cardsRemaining === 42) {
        cardsArray
    }
}

function setButton() {
    newCardBtn.disabled = false;
    if(cardsRemaining === 0) {
        newCardBtn.disabled = true; 
    }
}