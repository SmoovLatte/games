import React, { useState } from "react";
import MemoryCard from "./MemoryCard";
import StatusBar from "./StatusBar";
import "./index.css";

const colors = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
];

function generateCards() {
  const cards = [];
  for (let i = 0; i < colors.length; i++) {
    cards.push({
      key: i * 2,
      color: colors[i],
      isFlipped: false,
    });
    cards.push({
      key: i * 2 + 1,
      color: colors[i],
      isFlipped: false,
    });
  }
  return cards.sort(() => Math.random() - 0.5);
}

function Memory() {
  const [cards, setCards] = useState(generateCards());
  // const cards = generateCards();
  // const status = "Time: 0s";

  function onCardClick(card) {
    setCards((oldCards) =>
      oldCards.map((oldCard) => {
        if (oldCard.key === card.key)
          return { ...oldCard, isFlipped: !card.isFlipped };
        return oldCard;
      })
    );
  }

  function onRestart() {
    setCards(generateCards());
  }

  return (
    <div>
      <div className="game-container">
        <StatusBar status={status} onRestart={onRestart}></StatusBar>
        <div className="memory-grid">
          {cards.map((card) => (
            <MemoryCard
              key={card.key}
              color={card.color}
              isFlipped={card.isFlipped}
              onClick={() => onCardClick(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Memory;
