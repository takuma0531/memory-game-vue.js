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
    flipFirstCard(state, firstCard, isFlipped, optional) {
      state.firstCard.card = firstCard;
      state.firstCard.isFlipped = isFlipped;
      state.firstCard.optional = optional;
    },
    storeMatchedCards(state, index) {
      state.matchedCards.push(index);
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
