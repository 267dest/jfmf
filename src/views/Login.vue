<template>
        <div class="partition-form" style="padding-top: 0px">
          <form @submit.prevent="handleSubmit()" autocomplete="false">
            <div class="autocomplete-fix">
              <input disabled type="password">
            </div>
            <input id="username" type="text" placeholder="Staff Email Address *" v-model="form.email">
            <input id="password" type="password" placeholder="Password *" v-model="form.password">
          <div class="button-set">
            <button id="Login">Login</button>
          </div>
          </form>
        </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
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
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
    ...mapState('account', ['user']),
  },
  methods: {    
    ...mapActions('account', ['login']),
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
</style>
