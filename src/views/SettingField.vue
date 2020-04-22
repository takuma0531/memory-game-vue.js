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
      <select name="card-type" id="card-type-select" v-model="cardType">
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

      <button v-on:click="startGame">Start</button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'SettingField',
  data() {
    return {
      nPlayer: 1,
      cardType: 'cat',
      nCard: 12,
    };
  },

  methods: {
    startGame() {
      $(document).ready(() => {
        $('.setting-option').hide();
      });
    },
  },
};
</script>

<style scoped>
</style>
