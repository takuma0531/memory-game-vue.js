<template>
  <div class="player-status">
    <p :class="`player ${highlight}`">{{ player }} : <span>{{ score }}</span></p>
  </div>
</template>

<script>
export default {
  name: 'PlayerStatus',
  props: {
    pstatus: {
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      player: null,
    };
  },
  computed: {
    score() {
      return this.pstatus[`player${this.id + 1}`].score;
    },
    highlight() {
      if (this.player === this.$store.state.currentPlayer.name) {
        return 'current';
      }
      return '';
    },
  },

  methods: {
  },

  mounted() {
    this.player = this.pstatus[`player${this.id + 1}`].name;
  },
};
</script>

<style scoped>
.player-status {
  margin: 0.5vw;
}

.player {
  font-size: 1.5vw;
  color: #f5f9f5c7;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 10px;
  background: #29842ca3;
  border: 1px solid #29842ca3;
}

.player.current {
  color: #f0f328fa;
}

@media screen and (max-width: 1024px) {
  .player {
    font-size: 2.5vw;
  }
}
</style>
