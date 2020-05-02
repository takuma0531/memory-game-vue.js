import Vue from 'vue';
import Vuex from 'vuex';
import gameInfo from '../assets/game-info';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setGameInfo: {
      playersStatus: [],
      cardChar: null,
      nPairCard: null,
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
    currentPlayer: 'player1',
  },
  mutations: {
    setGameInfo(state, { playersStatus, cardSuit, pairCardsNum }) {
      state.setGameInfo.playersStatus = playersStatus;
      state.setGameInfo.cardChar = cardSuit;
      state.setGameInfo.nPairCard = pairCardsNum;
    },
    resetGameInfo(state) {
      state.setGameInfo.playersStatus = null;
      state.setGameInfo.cardChar = null;
      state.setGameInfo.nPairCard = null;
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
      state.setGameInfo.playersStatus[0].player1.score += 1;
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
      commit('setGameInfo', { playersStatus, cardSuit, pairCardsNum });
    },
  },
  modules: {
  },
});
