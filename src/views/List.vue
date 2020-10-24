d<template>
  <div>
    <h1>{{ title }}</h1>
<p>Catalog.</p>
   <br><br>
   <button><router-link to="/login">Go</router-link></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'List'
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

