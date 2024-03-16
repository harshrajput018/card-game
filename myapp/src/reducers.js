import { START_GAME, DRAW_CARD, SET_USERNAME, GAME_WON } from './actions';

const initialState = {
  username: '',
  deck: [],
  gameStarted: false,
  hasDefuse: false,
  explodingKittens: 0,
  gameWon: false,
  leaderboard: [],
  gameCompleted: false,
};




const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      const initialDeck = ['Cat', 'Defuse', 'Shuffle', 'Exploding Kitten', 'Cat'];
      const shuffledDeck = shuffleDeck([...initialDeck]);
      return {
        ...state,
        deck: shuffledDeck,
        gameStarted: true,
        hasDefuse: false,
        explodingKittens: 1,
        gameWon: false,
      };
    case DRAW_CARD:
      if (state.deck.length === 0) return state;

      const drawnCard = state.deck.shift();
      let newDeck = [...state.deck];
      let hasDefuse = state.hasDefuse;
      let explodingKittens = state.explodingKittens;
      let gameWon = state.gameWon;

      if (drawnCard === 'Exploding Kitten') {
        if (hasDefuse) {
          alert('You drew an Exploding Kitten! But you had a Defuse card. The kitten was defused!');
          explodingKittens--;
          hasDefuse = false;
        } else {
          alert('Game Over! You drew an Exploding Kitten!');
          return {
            ...initialState,
            username: state.username,
            leaderboard: state.leaderboard,
            gameCompleted:true,
          };
        }
      }

      if (drawnCard === 'Defuse') {
        hasDefuse = true;
        alert('You drew a Defuse card! You are safe for now.');
      }

      if (drawnCard === 'Shuffle') {
        alert('Shuffling deck...');
        newDeck = shuffleDeck([...newDeck]);
      }

      if (newDeck.length === 0) {
        gameWon = true;
        alert('Congratulations! You have won the game!');
        return {
          ...initialState,
          gameCompleted:true,
          username: state.username,
          leaderboard: [
            ...state.leaderboard,
            {
              username: state.username,
              wins: state.leaderboard.filter(entry => entry.username === state.username).length + 1,
            }
          ],
        };
      }

      return {
        ...state,
        deck: newDeck,
        hasDefuse,
        explodingKittens,
        gameWon,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
