let deckId;
let computerScore = 0;
let myScore = 0;
const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const header = document.getElementById("header");
const remainingText = document.getElementById("remaining");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");

function clear() {
  computerScore = 0;
  myScore = 0;
  header.textContent = `Game of War`;
  computerScoreEl.textContent = `Computer score: 0`;
  myScoreEl.textContent = `My score:0`;
  c1.innerHTML = "";
  c2.innerHTML = "";
}
function handleClick() {
  drawCardBtn.disabled = false;
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      clear();
      console.log("cvcxvcv");
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
      deckId = data.deck_id;
      console.log(deckId);
    });
}

newDeckBtn.addEventListener("click", handleClick);

drawCardBtn.addEventListener("click", () => {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
      cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
      cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `;
      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      header.textContent = winnerText;

      if (data.remaining === 0) {
        drawCardBtn.disabled = true;
        if (computerScore > myScore) {
          // display "The computer won the game!"
          header.textContent = "The computer won the game!";
        } else if (myScore > computerScore) {
          // display "You won the game!"
          header.textContent = "You won the game!";
        } else {
          // display "It's a tie game!"
          header.textContent = "It's a tie game!";
        }
      }
    });
});

/**
 * Challenge:
 *
 * Display the final winner in the header at the top by
 * replacing the text of the h2.
 */

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreEl.textContent = `Computer score: ${computerScore}`;
    return "Computer wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    myScore++;
    myScoreEl.textContent = `My score: ${myScore}`;
    return "You win!";
  } else {
    return "War!";
  }
}
