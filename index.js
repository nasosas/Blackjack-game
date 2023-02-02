let message = "";
const messageEL = document.getElementById("message-el");
const sumEL = document.getElementById("sum-el");
const cardsEL = document.getElementById("cards-el");
const dealersEL = document.getElementById("dealers-el");

const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const restartButton = document.getElementById("restartButton");

const betEl = document.querySelector("#bet-el");
const betInputEl = document.querySelector("#betInput");
const balanceEl = document.querySelector("#balance-el");

let balance = 100;
let bet = 0;

//hit and stand buttons
document.getElementById("hitButton").addEventListener("click", hit);
document.getElementById("standButton").addEventListener("click", stand);

//restart button functionality
restartButton.addEventListener("click", function() {
  location.reload();
});

//random card generation
function getRandomCard() {
  const randomNumber = Math.floor(Math.random() * 13 + 1);
  return randomNumber > 10 ? 10 : randomNumber === 1 ? 11 : randomNumber;
}

//checking is player,dealer alive, starting with 0 cards, giving cards
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

//hit logic
function hit() {
  playerCards.push(getRandomCard());
  playerSum += playerCards[playerCards.length - 1];
  if (playerSum > 21) {
    isPlayerAlive = false;
  }
  renderGame();
}

//display balance info, after betting removes bet value
betEl.addEventListener("click", function() {
  bet = parseInt(betInputEl.value);
  if (bet > balance) {
  alert("Insufficient balance. Please enter a lower amount.");
  } else {
  balance -= bet;
  balanceEl.innerHTML = "Balance: $" + balance;
  }
  });
  
  function stand() {
  while (dealerSum < 17) {
  let card = getRandomCard();
  dealerCards.push(card);
  dealerSum += card;
  }
  
  if (dealerSum > 21) {
  balance += bet * 2;
  messageEL.textContent = "You won, dealer bust!";
  } else if (dealerSum > playerSum) {
  balance -= bet;
  messageEL.textContent = "You lost.";
  } else if (dealerSum < playerSum) {
  balance += bet * 2;
  messageEL.textContent = "You won!";
  } else {
  balance += bet;
  messageEL.textContent = "Draw";
  }
  
  balanceEl.innerHTML = "Balance: $" + balance;
  
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
