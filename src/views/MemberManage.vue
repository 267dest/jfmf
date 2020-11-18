<template>
<!-- This is template for inserting navBar to files -->
  <div>
    <!-- Use NavBar -->
    <nav-bar></nav-bar>
    <h1> {{ title }} </h1>
    <a v-if="user.email == 'admin@jfmf.com'" href="#" type="button" class="cta" @click="show()">Staff Register</a>

    <div id="employee-table">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Employee name</th>
            <th>Employee email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="staff in staffs" :key="staff.username">
            <td> {{ staff.name }} </td>
            <td> {{ staff.email }} </td>
            <td v-if="staff.status" style="color=green">Online</td>
            <td v-if="!staff.status">offline</td>
            <td><button>edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>



    <modal name="regis-popup" transition="pop-out" :width="400" :focus-trap="true" :height="400" >
  <div class="regis-box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-login">
        <div class="partition-title">REGISTRATION</div>
        <!-- alert box -->
        <div v-if ="alert.message" :class="`alert ${alert.type}`">
          {{alert.message}}
          <a v-show="checkHide()"></a>
        </div>
        <!-- end alert box -->
        <div class="partition-form">
          <form @submit.prevent="handleSubmit()" autocomplete="false">
            <div class="autocomplete-fix">
              <input disabled type="password">
            </div>
            <input id="staff-id" type="text" placeholder="Staff Email Address *" v-model="form.email">
            <input id="password" type="password" placeholder="Create Password *" v-model="form.password">
            <input id="username" type="text" placeholder="Staff username *" v-model="form.username">
            <input id="name" type="text" placeholder="Staff name *" v-model="newstaff.name">
            <input id="birth_date" type="text" placeholder="Birth date *" v-model="newstaff.birth_date">
            <input id="phone_num" type="text" placeholder="Phone number *" v-model="newstaff.phone_num">
            
          <div style="margin-top: 13px">
          </div>
          <div class="button-set">
            <button id="Register">Register</button>
            <button id="Cancel" @click="hide()">Cancel</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</modal>

  </div>

</template>

<script>
//Import Navbar
import {mapState, mapActions} from 'vuex'
import NavBar from '../components/NavBar.vue'
import { firestore } from "firebase";
import { db, staffCol } from "../firebase";
export default {
  data() {
    return {
      title: 'Member management',
       form: {
        email: '',
        password: '', 
        username: '',
      },
      newstaff:{
        name:'',
       
        phone_num: 0,
        birth_date: "",
        status: false,
      },
      staffs:[],
      //member lists testing

    }
  },created() {
    db.collection('staffs').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.staffs.push(doc.data())
        console.log(doc.data())
      })
    })
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
    ...mapState('account', ['user']),
    
  },
    methods: {
      ...mapActions({
      clearAlert: 'alert/clear'
      }),
      checkHide(){
        if(this.alert.message=='Registration successful')
        setTimeout(this.hide, 3000)
      },

      show () {
        clearInterval(this.hide),
        this.clearAlert(),
        this.$modal.show('regis-popup')
      },
      hide () {
        this.clearAlert(),
        this.$modal.hide('regis-popup')
      },
      mount () {
        this.show()
      },
      reload(){
          window.location.reload()
        },
      ...mapActions('account', ['register']),
      ...mapActions('alert', ['error']),
      handleSubmit(){
        if(this.form.email && this.form.password){
          db.collection('staffs').doc(this.form.username).set({
            "email": this.form.email,
            "password": this.form.password,
            "username": this.form.username,
            "name": this.newstaff.name,
            "phone_num": this.newstaff.phone_num,
            "birth_date": this.newstaff.birth_date,
            "status": false,
          }).then(this.register(this.form).then(
            this.newstaff = []
          ))
        }
        else{
          this.error("All fields are required");
        }
        this.form = {email: '',
                  password: '',
                  username: '',}
      }
  },
  components: {
    NavBar
  }
};
</script>

<style>
  table, tr, td { 
    border: 1px solid black;
  }
  h1 {
    text-align: center;
    margin: 1 auto;
  }
</style>
