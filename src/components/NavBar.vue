<template>
  <div id="NavBar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/list">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/list"
              >Catalog</a
            >
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="/invenlog"
              >Log</a
            >
          </li>
         <li class="nav-item active">
            <a class="nav-link" href="/member"
              >Member</a
            ></li>
          </ul>
          <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <button class="nav-link" @click="this.logout()">Log Out</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "NavBar",
  methods: {
        ...mapActions('account',['logout']),
    }
};
</script>

<style></style>
