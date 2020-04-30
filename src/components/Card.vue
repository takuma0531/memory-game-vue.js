<template>
  <div class="card" :data-framework="`${card}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
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
