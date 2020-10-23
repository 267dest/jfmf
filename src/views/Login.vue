<template>
  <div>
    <h1>{{ title }}</h1>
<p>Please login to continue.</p>
   <br><br>
   <button><router-link to="/list">Go</router-link></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Login'
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
