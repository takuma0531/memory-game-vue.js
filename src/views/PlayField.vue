<template>
  <div class="play-field">
    <h1>PlayField</h1>
    {{ setGameInfo }}
  </div>
</template>

<script>
export default {
  name: 'PlayField',
  data() {
    return {
      setGameInfo: this.$store.state.setGameInfo,
    };
  },
};
</script>

<style scoped>

</style>
