<template>

  <div id="app">
    <!-- Use this on real product version of web app
      <router-view></router-view>
     instead of the one below -->
    
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
