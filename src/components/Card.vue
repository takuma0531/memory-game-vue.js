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
      isMatched: false,
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
  methods: {
    flipCard() {
      // disable mathced card
      if (this.isMatched) return;
      // disable first flipped card
      if (this.isFlipped) return;

      this.optional = 'flip';

      if (!this.$store.state.firstCard) {
        // handle first flip
        this.$store.commit('flipFirstCard', this.card);

        this.isFlipped = true;
      } else if (this.checkMatching(this.card)) {
        console.log('matched');

        this.isFlipped = true;
        this.isMatched = true;

        // init first flipped card
        this.$store.commit('flipFirstCard', null);

        // how to disable matched first card? TODO:
      } else {
        // handling when unmatched
        console.log('unmatched');

        this.isFlipped = false;
        this.$store.commit('flipFirstCard', null);
        this.optional = '';
        // How to unflip unmatched cards at the same time? TODO:
        // How to access another duplicated component? TODO:
      }
    },
    checkMatching(secondCard) {
      if (this.$store.state.firstCard === secondCard) {
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
