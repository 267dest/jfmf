<template>

  <div id="NavBar">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand class="navbar-brand" href="/list">MasterFarm</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/list"
              >Catalog</a
            >
          </li>
          <li class="nav-item active" >
            <a class="nav-link" href="/invenlog"
              >Log</a
            >
          </li>
         <li class="nav-item active">
            <a class="nav-link" href="/member" v-if="user.email == 'admin@jfmf.com'" s>
            Member Management
            </a>
            <a class="nav-link" href="/member" v-if="user.email != 'admin@jfmf.com'">
            Profile
            </a>
              </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active"> <a class="nav-link">{{ displayN }}</a></li>
          <li class="nav-item active">
            <a class="nav-link" href="#" @click="LogOut()">Log Out</a>
          </li>
        </ul>
      </b-collapse>
    </b-navbar>
  </div>
    <!-- <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">Link 1</b-nav-item>
        <b-nav-item href="#">Link 2</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
   -->
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {router} from '../routes'
import firebase from "firebase"
import { db } from "../firebase";
export default {
  
    
      data(){
        return{
        name: "NavBar",
        displayN: "",
        }
      },
    computed: {
    ...mapState({
      alert: state => state.alert
    }),
    ...mapState('account', ['user']),
    
  },
  created(){
    db.collection('staffs').get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    if( doc.get('email') == this.user.email){
                          
                              this.displayN = doc.get('username')
    }})})
  },
  methods: {
        ...mapActions('account',['logout']),
        LogOut(){
          this.logout()
        }
    }
};
</script>

<style>

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

  * {
    font-family: "Roboto", sans-serif;
  }
  

</style>
