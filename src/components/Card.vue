<template>
  <div :class="`memory-card ${optional}`" v-on:click="flipCard" :data-framework="`${card}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      isFlipped: false,
      optional: null,
    };
  },
  props: {
    card: {
      type: String,
      required: true,
    },
  },
  methods: {
    flipCard() {
      if (this.isFlipped) return;

      this.optional = 'flip';

      this.isFlipped = true;
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
  transform: scale(1);
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
