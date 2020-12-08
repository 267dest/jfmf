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
    
      <button v-show="user.email != 'admin@jfmf.com'" id="Delete" class="btn btn-danger" @click="showConfirmaS()">Delete</button>
      <div id="employee-table">
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="staff in staffs" >
              <tr v-show="!staff.deleted" :key="staff.username">
                <td> {{ staff.name }} </td>
                <td> {{ staff.email }} </td>
                <td class="text-success" v-if="staff.status">Online</td>
                <td class="text-muted" v-if="!staff.status">Offline</td>
                <td style="width:10%; text-align: center;"><button class="btn btn-danger" v-show="user.email == 'admin@jfmf.com' && staff.email != 'admin@jfmf.com'" @click="showConfirmaM(staff)">Delete</button></td>
              </tr>
              </template>
            </tbody>
          </table>
          
        </div>
        <div style="text-align:center;">
            <button v-if="user.email == 'admin@jfmf.com'" href="#" type="button" class="btn btn-dark" @click="show()">Staff Register</button>
            <button @click="edit()" class="btn btn-light">Edit</button>
          </div>
      </div>
    <modal name="confirmS-popup" transition="pop-out" :width="400" :focus-trap="true" :height="400">
        <button class="btn btn-danger" @click="ConfirmaS()">Confirm</button>
        <button class="btn" @click="hideConfirmaS()">Cancel</button>
    </modal>

    <modal name="confirmM-popup" transition="pop-out" :width="400" :focus-trap="true" :height="205">
      <div class="modal-header" style="background-color: #353A40;">
        <h5 class="modal-title" style="color: white">Confirm Deletion</h5>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to remove this user?</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" @click="ConfirmaM()">Confirm</button>
        <button class="btn" @click="hideConfirmaM()">Cancel</button>
      </div>
    </modal>
    
  
    <modal class="modal-regis" name="regis-popup" transition="pop-out" :focus-trap="true" :height="500">
  <div class="regis-box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-login">
        <div class="partition-title" style="color: black; text-align: center;">REGISTRATION</div>
        <hr>
        <!-- alert box -->
        <div v-if ="alert.message" :class="`alert ${alert.type}`">
          {{alert.message}}
          <a v-show="checkHide()"></a>
        </div>
        <!-- end alert box -->
        <div class="partition-form">
          <form @submit.prevent="handleSubmit()" autocomplete="false">
            <div style="display: none" class="autocomplete-fix">
              <input  disabled type="password">
            </div>
            <label for="email"><b>Email</b></label>
            <input name="email" :disabled="eState" id="staff-id" type="text" placeholder="Staff Email Address *" v-model="form.email">
            <label for="password"><b>Password</b></label>
            <input name="password" id="password" type="password" placeholder="Create Password *" v-model="form.password">
            <label for="username"><b>Username</b></label>
            <input name="username" :disabled="eState" id="username" type="text" placeholder="Staff username *" v-model="form.username">
            <label for="name"><b>Name</b></label>
            <input name="name" id="name" type="text" placeholder="Staff name *" v-model="newstaff.name">
            <label for="birth_date"><b>Birth date</b></label>
            <br>
            <input type="date" id="birth_date" name="birth_date"
       value="datetime-local" max="datetime-local" v-model="newstaff.birth_date"><br>
            <label for="phone_num"><b>Phone number</b></label>
            <input name="phone_num" id="phone_num" type="text" placeholder="Phone number *" v-model="newstaff.phone_num">
            
          <div style="margin-top: 13px">
          </div>
          <hr>
          <p>*Required</p>
          <div class="button-set" style="text-align: center;">
            <button class="btn btn-primary" id="Register" style="width: 49%;">Submit</button>
            <button class="btn btn-secondary" id="Cancel" @click="hide()" style="width: 49%;">Cancel</button>
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
        var numbers = /^[0-9]+$/;
        var check = true;
        if( this.form.email && this.form.password && this.form.username && this.newstaff.name && this.newstaff.phone_num && this.newstaff.birth_date){
          this.staffs.forEach(staff => {
            if(staff.email == this.form.email && !staff.deleted){
              this.error("This email has been used")
              check = false
            }
            else if (staff.username == this.form.username && !staff.deleted){
              this.error("This username has been used")
              check = false
            }
          });}        
          else{
          this.error("All fields are required");
        }
          if(check){
            if(this.form.email.length < 3 || !this.form.email.includes('@')){
              this.error("Email is badly format")
            }
            else if (this.form.password.length < 6){
              this.error("Password is badly format")
            }
            else if (this.newstaff.phone_num.length != 10 || !this.newstaff.phone_num.match(numbers)){
              this.error("Phone number is badly format")
            }
            else{
          db.collection('staffs').doc(this.form.username).set({
            "email": this.form.email,
            "password": this.form.password,
            "username": this.form.username,
            "name": this.newstaff.name,
            "phone_num": this.newstaff.phone_num,
            "birth_date": this.newstaff.birth_date,
            "status": false,
            "deleted": false
          }).then(this.register(this.form).then(this.form = {email: '',
                  password: '',
                  username: '',}.then(
            this.newstaff = []
          ).then(this.reload())))
          }}

        
      }
  },
  components: {
    NavBar
  }
};
</script>

<style>

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

  * {
    font-family: "Roboto", sans-serif;
  }
  th {
    text-align: center;
  }

  .btn-light, .btn-dark {
    width: 150px;
    margin: 4px 2px;
  }
  #employee-table {
    margin: 50px;
    box-shadow: 0px 2px 8px #888888;
  
  }

  /* .modal-regis{
    overflow-y:scroll;
  } */


  .regis-box {
      position: relative;
  height: 500px;
    padding: 3em;
      overflow-y:scroll;
  
  }

  .box-part {
    font-size: 1em; 
    letter-spacing: 1px;
    font-weight: 300;
  }

  input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}



</style>
