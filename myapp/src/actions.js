export const START_GAME = 'START_GAME';
export const DRAW_CARD = 'DRAW_CARD';
export const SET_USERNAME = 'SET_USERNAME';

export const startGame = () => ({
  type: START_GAME,
});

export const drawCard = () => ({
  type: DRAW_CARD,
});

export const setUsername = (username) => ({
  type: SET_USERNAME,
  payload: username,
});

