<template>
  <div class="player-status">
    <p>{{ pstatus }}</p>
    <p>{{ player }}</p>
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
  },

  methods: {
  },

  mounted() {
    this.player = this.pstatus[`player${this.id + 1}`].name;
  },
};
</script>

<style scoped>
.players {
  list-style-type: none;
}
</style>
