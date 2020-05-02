<template>
  <div :class="`memory-card ${opt}`" v-on:click="flipCard" :data-card="`${card}-${index}`">
    <slot></slot>
  </div>
</template>

<script>
// if matched, pairs are removed from the table TODO:

export default {
  name: 'Card',

  data() {
    return {
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

  computed: {
    opt() {
      if (this.index === this.$store.state.firstCard.index) {
        return this.optional;
      }
      if (this.index === this.$store.state.secondCard.index) {
        return this.optional;
      }
      return '';
    },
  },

  methods: {
    flipCard() {
      // disable this component card
      if (this.isFlipped) return;
      // disable the second card to stop flipping cards one after another
      if (this.$store.state.secondCard.isFlipped) return;

      this.isFlipped = true;
      this.optional = 'flip';

      if (!this.$store.state.firstCard.card) {
        // handle first flip
        this.handleFirstCard(this.card, this.isFlipped, this.optional, this.index);
      } else if (this.checkMatching(this.card)) {
        // handle second flip
        console.log('matched');
        this.handleSecondCard(this.card, this.isFlipped, this.optional, this.index);

        // init first flipped card
        setTimeout(() => {
          this.handleFirstCard(null, false, '', null);
          this.handleSecondCard(null, false, '', null);
        }, 900);
      } else {
        // handling when unmatched
        console.log('unmatched');
        this.$store.commit('flipSecondCard', {
          sCard: this.card, isFlipped: this.isFlipped, optional: this.optional, index: this.index,
        });

        setTimeout(() => {
          this.isFlipped = false;
          this.optional = '';
          this.handleFirstCard(null, false, '', null);
          this.handleSecondCard(null, false, '', null);
        }, 900);
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

.memory-card:hover {
  cursor: pointer;
}

.front-face, .back-face {
  width: 80%;
  height: 80%;
  padding: 15px;
  position: absolute;
  border-radius: 10px;
  background: #1C7CCC;
  backface-visibility: hidden;
}

.front-face {
  transform: rotateY(180deg);
}
</style>
