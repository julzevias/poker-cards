import "./App.css";
import { useState } from "react";

// Implement an UI to draw and display a deck of poker cards

// Min requirements
// - Shuffle poker cards deck at first (you can use a shuffle function from libs such as lodash)
// - 52 cards: A, 2, 3, 4, 5, ..., K, 4 suits per rank (diamonds (♦️), clubs (♣️), hearts (♥️), and spades(♠️))
// - Display 4 cards at a Time
// - 4 cards should occupy full width of the visualViewport, card height is always 2x card width
// - display number and suit on each card at least once
// - when there are more card to draw, display a button to draw and display the next 4 cards
// -when there are no more cards to draw, display a shuffle button to shuffle amd reset the deck

// bonus Points
// - mimicking real poker cards
//   - display the number and suit on the diagonal positions in mirrored placements
//   - display corresponding number of suits in the middle of the card
//   - display already dealt cards
//  - display remaining cards as a visual "deck"
// - implement the shuffle function from scratch (e.g. fisher-yates)

function App() {
  const [deck, setDeck] = useState(() => {
    return shuffle();
  });

  const drawCards = () => {
    const temp = [...deck];

    let i = 0;
    while (i < 4) {
      temp.pop();
      i++;
    }

    setDeck(temp);
  };

  const reshuffle = () => {
    const deck = shuffle();

    setDeck(deck);
  };

  if (deck.length === 0) {
    return <button onClick={reshuffle}>Reshuffle</button>;
  } else {
    return (
      <>
        <div className="card-container">
          {deck.slice(deck.length - 4, deck.length).map((card) => {
            return (
              <div
                key={`${card[0]}, ${card[1]}`}
                className={`card ${
                  card[1] === "♥️" || card[1] === "♦️" ? "red" : ""
                }`}
              >
                <div className="item">{card[0]}</div>
                <div className="item">{card[1]}</div>
                <div className="item">{card[1]}</div>
                <div className="item">{card[0]}</div>
              </div>
            );
          })}
        </div>

        <button onClick={drawCards}>draw</button>
      </>
    );
  }
}

const shuffle = () => {
  const suits = ["♦️", "♠️", "♥️", "♣️"];
  const values = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const deck = [];

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      deck.push([values[i], suits[j]]);
    }
  }

  for (let i = 0; i < deck.length - 1; i++) {
    let j = Math.floor(Math.random() * i);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};

export default App;
