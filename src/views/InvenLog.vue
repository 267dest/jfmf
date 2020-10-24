<template>
  <div>
    <h1>{{ title }}</h1>
<p>Log</p>
   <br><br>
   <button><router-link to="/list">Login</router-link></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Inventory Log'
    }
  },
  methods: {
  },
  components: {
  }
};
</script>

<style>
</style>
