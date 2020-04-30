<template>
  <div class="card" :data-framework="`${card}`" v-on:click="flipCard()">
    <slot></slot>
  </div>
</template>

<script>
// import $ from 'jquery';

// $(document).ready(() => {
//   $('.setting-option').hide();
// });

export default {
  name: 'Card',
  props: {
    card: {
      type: String,
      required: true,
    },
  },
  methods: {
    flipCard() {
      console.log('flipped');
    },
  },
};
</script>

<style scoped>
.card {
  margin: 10px;
  width: calc(25% - 20px);
  height: calc(25% - 20px);
  position: relative;
  transform: scale(1);
}

.card:active {
  transform: scale(0.97);
  transition: transform .2s;
}

.front-face, .back-face {
  width: 80%;
  height: 80%;
  padding: 15px;
  position: absolute;
  border-radius: 10px;
  background: #1C7CCC;
}
</style>
