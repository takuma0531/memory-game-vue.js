<template>
  <div class="play-field">
    <div v-for="(card, index) in cards" v-bind:key="index">
      <Card>
        <img :src="`${publicPath}images/${card}`" alt="frontimg">
      </Card>
    </div>

    <button v-on:click="restart"><router-link to="/">Go back to Home</router-link></button>
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
      this.cards = this.setGameInfo.cardChar.concat(clonedeep(this.setGameInfo.cardChar));
    }, 100);
  },
};
</script>

<style scoped>

</style>
