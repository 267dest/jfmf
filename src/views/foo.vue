<template>
<!-- This is template for inserting navBar to files -->
  <div>
    <!-- Use NavBar -->
    <nav-bar></nav-bar>

    <h1>foo</h1>
  </div>

</template>

<script>
//Import Navbar
import NavBar from '../components/NavBar.vue'
export default {
  name: 'foo'
,
components: {
    NavBar
  }
}
</script>

<style>

</style>
