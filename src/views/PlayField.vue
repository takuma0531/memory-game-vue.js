<template>
  <div class="play-field">
    {{ setGameInfo }}
    <button v-on:click="restart"><router-link to="/">Go back to Home</router-link></button>

    <div v-for="(card, index) in cards" v-bind:key="index">
      <Card>
        <img :src="`${publicPath}images/${card}`" alt="frontimg" width="100px" height="100px">
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

</style>
