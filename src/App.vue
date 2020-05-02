<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import SettingField from './views/SettingField.vue';

export default {
  component: {
    SettingField,
  },
};
</script>

<style>
body {
  background: #4ba774de;
}
</style>
