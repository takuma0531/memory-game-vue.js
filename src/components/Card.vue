<template>
  <div :class="`memory-card ${opt}`" v-on:click="flipCard">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',

  data() {
    return {
      allCardsNum: this.$store.state.setGameInfo.nCard,
      isFlipped: false,
      optional: '',
    };
  },
  props: {
    card: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  // computed applies to all the components
  computed: {
    opt() {
      if (this.index === this.$store.state.firstCard.index) {
        return this.optional;
      }
      if (this.index === this.$store.state.secondCard.index) {
        return this.optional;
      }
      if (this.removeMatchedCards()) {
        return 'remove';
      }
      return '';
    },
  },

  methods: {
    flipCard() {
      // disable first flipped card
      if (this.$store.state.firstCard.index === this.index) return;
      // disable the second card to stop flipping cards one after another
      if (this.$store.state.secondCard.isFlipped) return;

      this.isFlipped = true;
      this.optional = 'flip';

      if (!this.$store.state.firstCard.card) {
        // handle first flip
        this.handleFirstCard(this.card, this.isFlipped, this.optional, this.index);
      } else if (this.checkMatching(this.card)) {
        // handle second flip
        this.handleSecondCard(this.card, this.isFlipped, this.optional, this.index);

        // store paired cards
        this.$store.commit('storeMatchedCards');

        // init flipped card
        setTimeout(() => {
          this.isFlipped = false;
          this.optional = '';
          this.handleFirstCard(null, this.isFlipped, this.optional, null);
          this.handleSecondCard(null, this.isFlipped, this.optional, null);

          // end game
          if (this.allCardsNum === this.$store.state.matchedCards.length) {
            this.$store.commit('setWinners');
          }
        }, 900);

        // add score
        this.$store.commit('addScore');
      } else {
        // handling when unmatched
        this.$store.commit('flipSecondCard', {
          sCard: this.card, isFlipped: this.isFlipped, optional: this.optional, index: this.index,
        });

        setTimeout(() => {
          this.isFlipped = false;
          this.optional = '';
          this.handleFirstCard(null, this.isFlipped, this.optional, null);
          this.handleSecondCard(null, this.isFlipped, this.optional, null);
        }, 900);

        this.$store.commit('changeTurn');
      }
    },

    handleFirstCard(card, isFlipped, optional, index) {
      this.$store.commit('flipFirstCard', {
        fCard: card, isFlipped, optional, index,
      });
    },

    handleSecondCard(card, isFlipped, optional, index) {
      this.$store.commit('flipSecondCard', {
        sCard: card, isFlipped, optional, index,
      });
    },

    checkMatching(secondCard) {
      if (this.$store.state.firstCard.card === secondCard) {
        return true;
      }
      return false;
    },

    removeMatchedCards() {
      return this.$store.state.matchedCards.some((mc) => mc === this.index);
    },
  },
};
</script>

<style scoped>
.memory-card {
  margin: 10px;
  width: calc(25% - 20px);
  height: calc(25% - 20px);
  position: relative;
  transform-style: preserve-3d;
  transition: transform .5s;
}

.memory-card.flip {
  transform: rotateY(180deg);
}

.memory-card.remove {
  visibility: hidden;
}

.memory-card:hover {
  cursor: pointer;
}

.front-face, .back-face {
  width: 80%;
  height: 80%;
  padding: 3px;
  position: absolute;
  border-radius: 10px;
  background: #7dcc8780;
  backface-visibility: hidden;
}

.front-face {
  transform: rotateY(180deg);
}

@media screen and (max-width: 767px) {
  .memory-card {
    width: calc(25% - 20px);
    height: calc(25% - 20px);
  }

  .front-face, .back-face {
    width: 100%;
    height: 100%;
  }
}
</style>
