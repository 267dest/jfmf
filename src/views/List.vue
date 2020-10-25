d<template>
  <div>
      <nav-bar />
    <h1>{{ title }}</h1>
<p>Catalog.</p>
  </div>
</template>

<script>
//Import Navbar
import NavBar from '../components/NavBar.vue'
export default {
  data() {
    return {
      title: 'List'
    }
  },
  methods: {
  },
  components: {
      NavBar
  }
};
</script>

<style>
</style>

