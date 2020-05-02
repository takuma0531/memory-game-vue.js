<template>
  <div class="play-field">
    <p>{{ setGameInfo }}</p>
    <router-link v-on:click.native="restart" to="/">Go back to Home</router-link>

    <div>{{ renderingWinners }}</div>

    <PlayerStatus v-for="(pstatus, id) in playersStatus" :key="id" :pstatus="pstatus" :id="id"/>

    <div class="memory-game">
      <Card v-for="(card, index) in cards" :key="index" :card="card" :index="index">
        <img class="front-face" :src="`${publicPath}images/${card}.jpg`" alt="frontimg">
        <img class="back-face" :src="`${setGameInfo.backImg}`" alt="backimg">
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue';
import PlayerStatus from './PlayerStatus.vue';

const clonedeep = require('lodash.clonedeep');

export default {
  name: 'PlayField',
  components: {
    Card,
    PlayerStatus,
  },
  data() {
    return {
      setGameInfo: this.$store.state.setGameInfo,
      cards: [],
      playersStatus: [],
      publicPath: process.env.BASE_URL,
      optional: '',
    };
  },

  computed: {
    renderingWinners() {
      if (this.$store.state.winners.length !== 0) {
        return `${this.$store.state.winners.toString()} win!`;
      }
      return '';
    },
  },

  methods: {
    restart() {
      this.$store.commit('resetGameInfo');
    },
  },

  mounted() {
    setTimeout(() => {
      // set players
      this.playersStatus = this.$store.state.setGameInfo.playersStatus;

      // set cards
      const setCards = [];
      for (let i = 0; i < this.setGameInfo.nPairCard; i += 1) {
        setCards.push(this.setGameInfo.cardChar[i]);
      }
      this.cards = setCards.concat(clonedeep(setCards));
    }, 100);
  },
};
</script>

<style scoped>
.play-field {
  height: 100vh;
}

.memory-game {
  /* background: #060AB2; */
  display: flex;
  flex-wrap: wrap;
  width: 640px;
  height: 640px;
  margin: auto;
  perspective: 1000px;
}
</style>
