<template>
<!-- This is template for inserting navBar to files -->
  <div>
    <!-- Use NavBar -->
    <nav-bar></nav-bar>


    <div v-show="user.email != 'admin@jfmf.com'">
      <h1>Profile</h1>
      <button @click="edit()" class="btn  ml-auto">edit</button>
        <template v-for="staff in staffs" >
              <ul v-if="staff.email == user.email" :key="staff.username">
                  <li>Name: {{ staff.name }}</li>
                  <li>Username: {{ staff.username }}</li>
                  <li>Email: {{ staff.email }}</li>
                  <li>Phone number: {{ staff.phone_num }}</li>
              </ul>
        </template>

    </div>




    <div v-show="user.email == 'admin@jfmf.com'">
    <h1> {{ title }} </h1>
    <button v-if="user.email == 'admin@jfmf.com'" href="#" type="button" class="btn" @click="show()">Staff Register</button>
      <button @click="edit()" class="btn">edit</button>
      <button v-show="user.email != 'admin@jfmf.com'" id="Delete" class="btn btn-danger" @click="showConfirmaS()">Delete</button>
      <div id="employee-table">
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="staff in staffs" >
              <tr v-show="!staff.deleted" :key="staff.username">
                <td> {{ staff.name }} </td>
                <td> {{ staff.email }} </td>
                <td v-if="staff.status" style="color=green">Online</td>
                <td v-if="!staff.status">offline</td>
                <td style="width:5%"><button class="btn btn-danger" v-show="user.email == 'admin@jfmf.com' && staff.email != 'admin@jfmf.com'" @click="showConfirmaM(staff)">Delete</button></td>
              </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    <modal name="confirmS-popup" transition="pop-out" :width="400" :focus-trap="true" :height="400">
        <button class="btn btn-danger" @click="ConfirmaS()">Confirm</button>
        <button class="btn" @click="hideConfirmaS()">Cancel</button>
    </modal>

    <modal name="confirmM-popup" transition="pop-out" :width="400" :focus-trap="true" :height="400">
        <button class="btn btn-danger" @click="ConfirmaM()">Confirm</button>
        <button class="btn" @click="hideConfirmaM()">Cancel</button>
    </modal>
    

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
            <input :disabled="eState" id="staff-id" type="text" placeholder="Staff Email Address *" v-model="form.email">
            <input id="password" type="password" placeholder="Create Password *" v-model="form.password">
            <input :disabled="eState" id="username" type="text" placeholder="Staff username *" v-model="form.username">
            <input id="name" type="text" placeholder="Staff name *" v-model="newstaff.name">
            <input id="birth_date" type="text" placeholder="Birth date *" v-model="newstaff.birth_date">
            <input id="phone_num" type="text" placeholder="Phone number *" v-model="newstaff.phone_num">
            
          <div style="margin-top: 13px">
          </div>
          <div class="button-set">
            <button id="Register">Submit</button>
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
import firebase from 'firebase'
require('firebase/auth')
import {router} from '../routes'
import {mapState, mapActions} from 'vuex'
import NavBar from '../components/NavBar.vue'
import { firestore , auth } from "firebase";
import { db, staffCol } from "../firebase";

export default {
  data() {
    return {
      title: 'Member management',
      eState: false,
      adminOn: false,
      userM: '',
       form: {
        email: '',
        password: '', 
        username: '',
      },
      newstaff:{
        name:'',
       
        phone_num: '',
        birth_date: "",
        status: false,
      },
      staffs:[],
      //member lists testing

    }
  },created() {
    if(!this.user){
  router.push("/")}
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
      showConfirmaS(){this.$modal.hide('regis-popup')
        this.$modal.show('confirmS-popup')},
      ConfirmaS () {
         this.Delete()
        this.hideConfirma()
      },
      hideConfirmaS(){
        this.$modal.hide('confirmS-popup')
        this.confirma = []
      },


      showConfirmaM(Mem){
        this.userM = Mem
        this.$modal.show('confirmM-popup')},
      ConfirmaM () {
        this.adminDel(this.userM)
      },
      hideConfirmaM(){
        this.$modal.hide('confirmM-popup')
        this.userM = '';
      },
      checkHide(){
        if(this.alert.message=='Registration successful')
        setTimeout(this.hide, 3000).then(this.reload())
      },


      adminDel(staff){
        db.collection('staffs').get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    if( doc.get('email') == staff.email && doc.get('email') != "admin@jfmf.com"){
                          db.collection('staffs').doc(doc.get('username')).update({'deleted': true})
                    }
                  })
                }).then(this.reload)
      },
      Delete(){
        db.collection('staffs').get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    if( doc.get('email') == firebase.auth().currentUser.email && doc.get('email') != "admin@jfmf.com"){
                      console.log("while del firebase "+firebase.auth().currentUser.email)
                          db.collection('staffs').doc(doc.get('username')).update({'deleted': true}).then(this.logout())
                    }
                  })
                })
                    
      },
      edit () {
        this.staffs.forEach(staff => {
          if(this.user.email == staff.email){
          this.eState = true
          this.form.email = staff.email
          this.form.password= staff.password, 
          this.form.username= staff.username,
          this.newstaff.name=staff.name,
          this.newstaff.phone_num= staff.phone_num,
          this.newstaff.birth_date= staff.birth_date}
        });
        clearInterval(this.hide),
        this.clearAlert(),
        this.$modal.show('regis-popup')
         },
      show () {
        this.eState = false
        this.form = []
        this.newstaff = []
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
      ...mapActions('account',['logout']),
      ...mapActions('account',['outto']),
      ...mapActions('account', ['login']),
      handleSubmit(){
        if( this.form.email && this.form.password && this.form.username && this.newstaff.name && this.newstaff.phone_num && this.newstaff.birth_date){
          db.collection('staffs').doc(this.form.username).set({
            "email": this.form.email,
            "password": this.form.password,
            "username": this.form.username,
            "name": this.newstaff.name,
            "phone_num": this.newstaff.phone_num,
            "birth_date": this.newstaff.birth_date,
            "status": false,
            "deleted": false
          }).then(this.register(this.form))
        }
        else{
          this.error("All fields are required");
        }
        this.form = {email: '',
                  password: '',
                  username: '',}.then(
            this.newstaff = []
          ).then(this.reload())
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

  .btn {
    border:1px solid black;
  }
</style>
