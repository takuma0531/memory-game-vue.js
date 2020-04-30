<template>
  <div class="setting-field">
    <div class="setting-option">
      <label for="players-select">Choose how many players:</label>
      <select name="players" id="players-select" v-model="nPlayer">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select><br>

      <label for="card-type-select">Choose which picture do you prefer:</label>
      <select name="card-type" id="card-type-select" v-model="cardChar">
        <option value="cat">cat</option>
        <option value="dog">dog</option>
        <option value="dinosaur">dinosaur</option>
      </select><br>

      <label for="cards-select">Choose how many cards:</label>
      <select name="cards" id="cards-select" v-model="nCard">
        <option value="12">12</option>
        <option value="16">16</option>
        <option value="20">20</option>
      </select><br>

      <router-link v-on:click.native="startGame" to="/play-field">Start</router-link>
      {{ this.$store.state.setGameInfo }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'SettingField',
  data() {
    return {
      nPlayer: 1,
      cardChar: 'cat',
      nCard: 12,
    };
  },

  methods: {
    startGame() {
      this.$store.dispatch('setGameInfo', { nPlayer: this.nPlayer, cardChar: this.cardChar, nCard: this.nCard });
    },
  },
};
</script>

<style scoped>
</style>
