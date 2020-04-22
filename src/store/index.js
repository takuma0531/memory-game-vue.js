import Vue from 'vue';
import Vuex from 'vuex';
import gameInfo from '../assets/game-info';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setGameInfo: {
      nPlayer: null,
      cardChar: null,
      nCard: null,
    },
  },
  mutations: {
    setGameInfo(state, { playerNum, cardSuit, cardNum }) {
      state.setGameInfo.nPlayer = playerNum;
      state.setGameInfo.cardChar = cardSuit;
      state.setGameInfo.nCard = cardNum;
    },
  },
  actions: {
    setGameInfo({ commit }, { nPlayer, cardChar, nCard }) {
      const playerNum = nPlayer;
      const cardSuit = gameInfo.cardChar[cardChar];
      const cardNum = gameInfo.cardsNum[nCard];
      commit('setGameInfo', { playerNum, cardSuit, cardNum });
    },
  },
  modules: {
  },
});
