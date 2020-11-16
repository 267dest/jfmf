<template>

  <div id="app">
    <router-view v-show="this.$route.name == 'Login' || user"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "app",
  data() {
    return {
    }
  },
    computed: {
    ...mapState('account', ['user'])
  },
};
</script>

<style>
</style>
