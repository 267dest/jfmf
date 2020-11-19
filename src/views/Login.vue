<template>
        <div class="partition-form">
          <div class="form">
            <img class="logo" src="../assets/Logo.jpg">
            <div v-if="alert.message" :class="`alert ${alert.type}`" style="position: relative;top:15px;">
          {{alert.message}}
        </div>
            <form @submit.prevent="handleSubmit()" autocomplete="false">
              <div class="autocomplete-fix" style="display: none;">
                <input disabled type="password">
              </div>
              <input id="username" type="text" placeholder="Staff Email Address *" v-model="form.email" style="position: relative;top:15px;">
              <input id="password" type="password" placeholder="Password *" v-model="form.password" style="position: relative;top:15px;">
              
            <div class="button-set" style="position: relative;top:15px;">
              <button id="Login">Login</button>
            </div>
            </form>
          </div>
        </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { router } from '../routes'
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  components:{
    mapState,
    mapActions,
  },
created(){
  if(this.user){
  router.push("/list")}
},
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
    ...mapState('account', ['user']),
  },
  methods: {    
    ...mapActions('account', ['login']),
    ...mapActions('account', ['outto']),
    ...mapActions('alert', ['error']),
    handleSubmit(e){
      if(this.form.email && this.form.password){
        this.login(this.form)
      }
      else{
          this.error("All fields are required");
      }
      this.form ={
        email: '',
        password: ''
      }
    }
    
      }
    }
</script>

<style>

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.partition-form {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #343a40;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.form button:hover,.form button:active,.form button:focus {
  background:#212529;
}

body{
  background: #e9ecef;
  background: -webkit-linear-gradient(right, #e9ecef, #f8f9fa);
  background: -moz-linear-gradient(right, #e9ecef, #f8f9fa);
  background: -o-linear-gradient(right, #e9ecef, #f8f9fa);
  background: linear-gradient(to left, #e9ecef, #f8f9fa);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.logo{
  width: 60%;
  height: 60%;
}

</style>
