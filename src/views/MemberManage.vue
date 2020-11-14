<template>
<!-- This is template for inserting navBar to files -->
  <div>
    <!-- Use NavBar -->
    <nav-bar></nav-bar>

    <h1> {{ title }} </h1>
  </div>

</template>

<script>
//Import Navbar
import NavBar from '../components/NavBar.vue'
export default {
  data() {
    return {
      title: 'Member Management'
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
