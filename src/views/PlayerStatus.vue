<template>
  <div class="player-status">
    <p :class="`${highlight}`">{{ player }}</p>
    <p>{{ score }}</p>
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
.current {
  color: red;
}
</style>
