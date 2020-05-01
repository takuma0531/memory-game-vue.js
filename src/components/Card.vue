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

  computed: {
    // TODO: unflip the first flipped card when there is no matching.
  },

  methods: {
    flipCard() {
      // disable first flipped card
      if (this.isFlipped) return;

      this.isFlipped = true;
      this.optional = 'flip';
      console.log(this.$store.state.firstCard.card);

      if (!this.$store.state.firstCard.card) {
        // handle first flip
        console.log('flipped first card');

        this.$store.commit('flipFirstCard', this.card, this.isFlipped, this.optional);
      } else if (this.checkMatching(this.card)) {
        // handle second flip
        console.log('matched');

        // init first flipped card
        this.$store.commit('flipFirstCard', null, false, '');

        // how to disable matched first card? TODO:
      } else {
        // handling when unmatched
        console.log('unmatched');

        this.isFlipped = false;
        this.opt = '';
        this.$store.commit('flipFirstCard', null, false, '');
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
