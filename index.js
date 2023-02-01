let playerCards = [];
let playerSum = 0;
let dealerCards = [];
let dealerSum = 0;
let hasBlackJack = false;
let isPlayerAlive = true;
let isDealerAlive = true;
let message = "";
let messageEL = document.getElementById("message-el");
let sumEL = document.getElementById("sum-el");
let cardsEL = document.getElementById("cards-el");
let dealersEL = document.getElementById("dealers-el");

const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");

hitButton.addEventListener("click", function() {
  hit();
});

standButton.addEventListener("click", function() {
  stand();
});


const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", function() {
  location.reload();
});

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13 + 1);
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  isPlayerAlive = true;
  isDealerAlive = true;
  playerCards = [];
  playerSum = 0;
  dealerCards = [];
  dealerSum = 0;
  hasBlackJack = false;
  playerCards.push(getRandomCard());
  playerCards.push(getRandomCard());
  playerSum = playerCards[0] + playerCards[1];
  dealerCards.push(getRandomCard());
  dealerCards.push(getRandomCard());
  dealerSum = dealerCards[0] + dealerCards[1];
  renderGame();
}

function hit() {
  playerCards.push(getRandomCard());
  playerSum += playerCards[playerCards.length - 1];
  if (playerSum > 21) {
    isPlayerAlive = false;
  }
  renderGame();
}

function stand() {
  while (dealerSum < 17) {
    let card = getRandomCard();
    dealerCards.push(card);
    dealerSum += card;
  }
  if (dealerSum > 21) {
    messageEL.textContent = "You won,";
  } else if (dealerSum > playerSum) {
    messageEL.textContent = "You lost,";
  } else if (dealerSum < playerSum) {
    messageEL.textContent = "You won,";
  } else {
    messageEL.textContent = "Draw";
  }
  let dealerCardsString = "Dealer's Cards: ";
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardsString += dealerCards[i] + " ";
  }
  messageEL.textContent += "\n" + dealerCardsString;
}
  
  function renderGame() {
    cardsEL.textContent = "Your Cards: ";
    for (let i = 0; i < playerCards.length; i++) {
      cardsEL.textContent += playerCards[i] + " ";
    }
    sumEL.textContent = "Sum: " + playerSum;
    if (playerSum <= 20) {
      message = "Do you want to draw another card?";
      isGameOver = false;
    } else if (playerSum === 21) {
      message = "You have blackjack!";
      hasBlackJack = true;
      isGameOver = true;
    } else {
      message = "You lost,";
      isGameOver = true;
    }
    messageEL.textContent = message + "\n Dealer's Cards: " + dealerCards[0] + " X";
  }
