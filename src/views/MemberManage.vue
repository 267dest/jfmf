<template>
  <div>
    <h1>{{ title }}</h1>
<p>Manage member</p>
   <br><br>
   <button><router-link to="/list">Login</router-link></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Member management'
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
