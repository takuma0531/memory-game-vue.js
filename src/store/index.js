import Vue from 'vue';
import Vuex from 'vuex';
import gameInfo from '../assets/game-info';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setGameInfo: {
      playersStatus: [],
      nPlayer: null,
      cardChar: null,
      nPairCard: null,
      nCard: null,
      backImg: gameInfo.backImg,
    },
    firstCard: {
      card: null,
      isFlipped: false,
      optional: '',
      index: null,
    },
    secondCard: {
      card: null,
      isFlipped: false,
      optional: '',
      index: null,
    },
    matchedCards: [],
    currentPlayer: {
      id: 0,
      name: 'player1',
    },
    winners: [],
  },

  mutations: {
    setGameInfo(state, {
      playersStatus, nPlayer, cardSuit, pairCardsNum, nCard,
    }) {
      state.setGameInfo.playersStatus = playersStatus;
      state.setGameInfo.nPlayer = nPlayer;
      state.setGameInfo.cardChar = cardSuit;
      state.setGameInfo.nPairCard = pairCardsNum;
      state.setGameInfo.nCard = nCard;
    },

    resetGameInfo(state) {
      state.setGameInfo.playersStatus = null;
      state.setGameInfo.cardChar = null;
      state.setGameInfo.nPairCard = null;
      state.setGameInfo.nCard = null;
      state.currentPlayer.id = 0;
      state.currentPlayer.name = 'player1';

      for (let i = 0; i < 4; i += 1) {
        gameInfo.playersStatus[i][`player${i + 1}`].score = 0;
      }
    },

    flipFirstCard(state, {
      fCard, isFlipped, optional, index,
    }) {
      state.firstCard.card = fCard;
      state.firstCard.isFlipped = isFlipped;
      state.firstCard.optional = optional;
      state.firstCard.index = index;
    },

    flipSecondCard(state, {
      sCard, isFlipped, optional, index,
    }) {
      state.secondCard.card = sCard;
      state.secondCard.isFlipped = isFlipped;
      state.secondCard.optional = optional;
      state.secondCard.index = index;
    },

    storeMatchedCards(state) {
      state.matchedCards.push(state.firstCard.index);
      state.matchedCards.push(state.secondCard.index);
    },

    addScore(state) {
      state.setGameInfo.playersStatus[state.currentPlayer.id][state.currentPlayer.name].score += 1;
    },

    changeTurn(state) {
      console.log(state.currentPlayer.id);
      console.log(state.setGameInfo.playersStatus.length);
      if (state.currentPlayer.id === state.setGameInfo.playersStatus.length - 1) {
        state.currentPlayer.id = 0;
        state.currentPlayer.name = 'player1';
      } else {
        state.currentPlayer.id += 1;
        state.currentPlayer.name = `player${state.currentPlayer.id + 1}`;
      }
    },

    setWinners(state) {
      let max = 0;
      for (let i = 0; i < state.setGameInfo.nPlayer; i += 1) {
        const { score } = state.setGameInfo.playersStatus[i][`player${i + 1}`].score;
        if (max > score) {
          max = score;
        }
      }

      for (let i = 0; i < state.setGameInfo.nPlayer; i += 1) {
        state.winners.push(state.setGameInfo.playersStatus[i][`player${i + 1}`].name);
      }
    },
  },

  actions: {
    setGameInfo({ commit }, { nPlayer, cardChar, nCard }) {
      const playersStatus = [];
      for (let i = 0; i < nPlayer; i += 1) {
        playersStatus.push(gameInfo.playersStatus[i]);
      }
      const cardSuit = gameInfo.cardChar[cardChar];
      const pairCardsNum = gameInfo.pairCardsNum[nCard];
      commit('setGameInfo', {
        playersStatus, nPlayer, cardSuit, pairCardsNum, nCard,
      });
    },
  },
});
