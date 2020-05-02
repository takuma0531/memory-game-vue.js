<template>
  <div class="setting-field">
    <h1 class="greeting">Let's play Memory Game!!</h1>
    <div class="setting-option">
      <div class="players-select">
        <label for="players-select">Choose how many players:</label>
        <select name="players" id="players-select" v-model="nPlayer">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select><br>
      </div>

      <div class="card-type-select">
        <label for="card-type-select">Choose which picture do you prefer:</label>
        <select name="card-type" id="card-type-select" v-model="cardChar">
          <option value="cat">cat</option>
          <option value="dog">dog</option>
          <option value="dinosaur">dinosaur</option>
        </select><br>
      </div>

      <div class="cards-select">
        <label for="cards-select">Choose how many cards:</label>
        <select name="cards" id="cards-select" v-model="nCard">
          <option value="12">12</option>
          <option value="16">16</option>
          <option value="20">20</option>
        </select><br>
      </div>

      <router-link class="start" v-on:click.native="startGame" to="/play-field">Start</router-link>
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
.greeting {
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: 4vw;
}

.setting-option {
  font-size: 2vw;
  color: white;
  font-weight: bold;
  margin: auto;
  margin-top: 120px;
  text-align: center;
  padding-top: 2vw;
  width: 70vw;
  height:35vw;
  background: #0e58108c;
  border-radius: 10px;
  box-shadow: 0.7px 0.5px 0.5px 0px black;
}

.players-select, .card-type-select, .cards-select {
  margin: 4vw auto;
}

label {
  margin-right: 10px;
}

#players-select, #card-type-select, #cards-select {
  font-size: 1.2vw;
  color: white;
  background: #19ca1799;
}

.start {
  color: #ef1515d1;
  font-weight: bold;
  text-decoration: none;
  padding: 4px;
  border: #19ca1799 solid 3px;
  border-radius: 20px;
  background: #19ca1799;
}

.start:hover {
  background: green;
}

@media screen and (max-width: 1024px) {
  .greeting {
    font-size: 5vw;
  }

  .setting-option {
    font-size: 3vw;
    margin-top: 14vw;
  }

  #players-select, #card-type-select, #cards-select {
    font-size: 2vw;
  }
}
</style>
