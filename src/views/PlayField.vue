<template>
  <div class="play-field">
    {{ setGameInfo }}
    <router-link v-on:click.native="restart" to="/">Go back to Home</router-link>

    <div class="memory-game">
      <Card v-for="(card, index) in cards" v-bind:key="index" :card="card">
        <img class="front-face" :src="`${publicPath}images/${card}.jpg`" alt="frontimg">
        <img class="back-face" :src="`${setGameInfo.backImg}`" alt="backimg">
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue';

const clonedeep = require('lodash.clonedeep');

export default {
  name: 'PlayField',
  components: {
    Card,
  },
  data() {
    return {
      setGameInfo: this.$store.state.setGameInfo,
      cards: [],
      publicPath: process.env.BASE_URL,
    };
  },

  methods: {
    restart() {
      this.$store.commit('resetGameInfo');
    },
  },

  mounted() {
    // TODO: Find another better way.
    setTimeout(() => {
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
