<template>
  <div :class="`memory-card ${optional}`" v-on:click="flipCard" :data-card="`${card}-${index}`">
    <slot></slot>
  </div>
</template>

<script>
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

  watch: {
    // TODO: unflip the first flipped card when there is no matching.
    opt() {
      this.optional = this.$store.state.firstCard.optional;
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
        this.$store.commit('flipFirstCard', { firstCard: this.card, isFlipped: this.isFlipped, optional: this.optional });
      } else if (this.checkMatching(this.card)) {
        // handle second flip
        console.log('matched');

        // init first flipped card
        this.$store.commit('flipFirstCard', { firstCard: null, isFlipped: false, optional: '' });

        // how to disable matched first card? TODO:
      } else {
        // handling when unmatched
        console.log('unmatched');
        this.$store.commit('flipSecondCard', this.isFlipped);

        setTimeout(() => {
          this.isFlipped = false;
          this.optional = '';
          this.$store.commit('flipFirstCard', { firstCard: null, isFlipped: false, optional: '' });
          this.$store.commit('flipSecondCard', this.isFlipped);
        }, 900);
        // How to unflip unmatched cards at the same time? TODO:
        // How to access another duplicated component? TODO:
      }
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
