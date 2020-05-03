<template>
  <div class="play-field">
    <div class="player-status">
      <PlayerStatus v-for="(pstatus, id) in playersStatus" :key="id" :pstatus="pstatus" :id="id"/>
    </div>

    <div class="winners-modal">
      <div class="winners-modal-content">
        <p class="winners">{{ winners }}</p>
        <router-link class="restart" v-on:click.native="restart" to="/">Restart Game</router-link>
      </div>
    </div>

    <div class="memory-game">
      <Card v-for="(card, index) in cards" :key="index" :card="card" :index="index">
        <img class="front-face" :src="`${publicPath}images/${card}.jpg`" alt="frontimg">
        <img class="back-face" :src="`${setGameInfo.backImg}`" alt="backimg">
      </Card>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
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
    winners() {
      if (this.$store.state.winners.length !== 0) {
        $('.winners-modal').show();
        return `${this.$store.state.winners.toString()} win!`;
      }
      return '';
    },
  },

  methods: {
    restart() {
      this.$store.commit('resetGameInfo');
    },
    shuffleCards() {
      for (let i = this.cards.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * i);
        const temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
      }
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
      this.shuffleCards();
    }, 100);
  },
};
</script>

<style scoped>
.play-field {
  position: relative;
}

.restart {
  color: #df2d2dd1;
  font-size: 2vw;
  font-weight: bold;
  text-decoration: none;
  padding: 4px;
  border: #19ca1799 solid 3px;
  border-radius: 20px;
  background: #19ca1799;
}

.restart:hover {
  background: green;
}

.player-status {
  display: flex;
  flex-direction: column;
  margin-left: 0;
  margin-right: 65%;
}

.winners-modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 10vw;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.45);
}

.winners-modal-content {
  background-color: #0e6103e0;
  border-radius: 10px;
  margin: auto;
  padding: 20px;
  border: 1px solid #1786209c;
  width: 60%;
  text-align: right;
  font-size: 2.5vw;
}

.winners {
  font-weight: bold;
  color: #f3d711f0;
  text-align: left;
}

.memory-game {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: 640px;
  height: 640px;
  left: 30%;
  top: 15%;
  perspective: 1000px;
}

@media screen and (max-width: 1024px) {
  .restart-field {
    text-align: center;
    margin-top: 3vw;
  }

  .restart {
    font-size: 3vw;
  }

  .player-status {
    display: flex;
    flex-direction: row;
    margin: 10px auto;
  }

  .winners-modal {
    padding-top: 40vw;
  }

  .winners-modal-content {
    font-size: 3vw;
    width: 80%;
  }

  .memory-game {
    position: relative;
    width: 90vw;
    height: 90vw;
    left: 0;
    top: 0;
    margin: auto;
  }
}
</style>
