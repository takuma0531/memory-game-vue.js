import Vue from 'vue';
import Vuex from 'vuex';
import gameInfo from '../assets/game-info';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setGameInfo: {
      nPlayer: null,
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
  },
  mutations: {
    setGameInfo(state, { playerNum, cardSuit, pairCardsNum }) {
      state.setGameInfo.nPlayer = playerNum;
      state.setGameInfo.cardChar = cardSuit;
      state.setGameInfo.nPairCard = pairCardsNum;
    },
    resetGameInfo(state) {
      state.setGameInfo.nPlayer = null;
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
  },
  actions: {
    setGameInfo({ commit }, { nPlayer, cardChar, nCard }) {
      const playerNum = nPlayer;
      const cardSuit = gameInfo.cardChar[cardChar];
      const pairCardsNum = gameInfo.pairCardsNum[nCard];
      commit('setGameInfo', { playerNum, cardSuit, pairCardsNum });
    },
  },
  modules: {
  },
});
