import React, { useState, useEffect } from "react";
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

function flipCard(cards, cardToFlip) {
  return cards.map((card) => {
    if (card.key === cardToFlip.key) {
      return { ...card, isFlipped: !card.isFlipped };
    }
    return card;
  });
}

function Memory() {
  // const startTime = Date.now();
  // setInterval(() => console.log(Date.now() - startTime), 1000);

  const [game, setGame] = useState({
    cards: generateCards(),
    firstCard: undefined,
    secondCard: undefined,
  });

  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [win, setWin] = useState(false);

  //useState(effect function> dependency array > - optional)
  // dependency array>
  //*undefined: effect function will be run on every render
  // * []: effect will run only on the first render
  //* [value2, value2]: effect will run when any of the values change
  //effect function returns a cleanup function (optional)
  //unmounts (disappears from the DOM)
  useEffect(() => {
    if (startTime !== 0 && !win) {
      const intervalId = setInterval(() => {
        console.log(startTime);
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startTime, win]);
  // const cards = generateCards();
  // const status = "Time: 0s";

  function onCardClick(clickedCard) {
    //map
    // The { cards, firstCard, secondCard } above is the decomposed game object.
    // These three variables represent the previous state, before a card was clicked.
    // We should return the new state, depending on the previous one and on the card that was clicked.
    // There are 4 different cases.

    // add a new state variable win to indicate whether the game is won
    // set win to true when all the cards have become flipped (find a good place for it in the onCardFlipped function)
    // modify one of the useEffect hooks to also watch win, so that its cleanup function runs when win changes
    // reset the win variable in onRestart
    if (clickedCard.isFlipped) {
      return;
    }
    setGame((oldGame) => {
      const cards = oldGame.cards;
      const firstCard = oldGame.firstCard;
      const secondCard = oldGame.secondCard;
      // 1. If both firstCard and secondCard from the previous state are undefined =>
      // we should flip the clicked card and set it as the firstCard

      if (firstCard == undefined && secondCard == undefined) {
        return {
          cards: flipCard(cards, clickedCard),
          firstCard: clickedCard,
          secondCard: undefined,
        };
        // 2. Else, if firstCard is defined, but secondCard isn't =>
        // we should flip the clicked card, keep the firstCard as is, but set the secondCard
      } else if (secondCard == undefined) {
        let newCards = flipCard(cards, clickedCard);
        if (newCards.every((card) => card.isFlipped)) {
          setWin(true);
          console.log("You won!");
        }
        return {
          cards: newCards,
          firstCard: firstCard,
          secondCard: clickedCard,
        };
      } else if (secondCard.color === firstCard.color) {
        //Else, if the previous two clicked cards have the same color =>
        // we should flip the clicked card, set the new firstCard and remove secondCard from the state

        return {
          cards: flipCard(cards, clickedCard),
          firstCard: clickedCard,
          secondCard: undefined,
        };
        //if all cards.is flipped == true {game.win = true}
      } else {
        // 4. Else, if the previous two clicked cards have different colors =>
        // we should flip the clicked card and flip back firstCard and secondCard,
        // we should also set the new firstCard and remove secondCard from the state
        //call flipCard 3 times, save array in between in a new variable - call flipcard on that variable
        let newCards = flipCard(cards, firstCard);
        newCards = flipCard(newCards, secondCard);
        newCards = flipCard(newCards, clickedCard);
        return {
          cards: newCards,
          firstCard: clickedCard,
          secondCard: undefined,
        };
      }

      // setCards((oldCards) =>
      // oldCards.map((oldCard) => {
      //   if (oldCard.key === card.key)
      //   return oldCard;

      //   /* check if 1st card is undefined - define, smae for second, if both are defined check if key is same, if key is same don't flip back */

      //   return { ...oldCard, isFlipped: !card.isFlipped }; /*don't flip bakc here if firstcard.key == secondCard.key */
      // })
      // );
      // console.log("not flipped");
    });
    setStartTime((oldStartTime) =>
      oldStartTime === 0 ? Date.now() : oldStartTime
    );
  }

  function onRestart() {
    setGame({
      cards: generateCards(),
      firstCard: undefined,
      secondCard: undefined,
    });
    setStartTime(0);
    setElapsedTime(0);
    setWin(false);
  }

  return (
    <div>
      <div className="game-container">
        <StatusBar status={`Time: ${elapsedTime}ms`} onRestart={onRestart} />
        <div className="memory-grid">
          {game.cards.map((card) => (
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
