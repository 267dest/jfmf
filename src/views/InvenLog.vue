<template>

<div>
  <nav-bar></nav-bar>
  <div>
    <h1>{{ title }}</h1>
    <date-picker v-model="timeR" range></date-picker>
    
    
    <select v-model="selected">
  <option disabled value="">Please select order type</option>
  <option>Order_by_date</option>
  <option>Order_by_quantity</option>
  <option>Order_by_margin</option>
</select>
<span>Selected: {{ selected }}</span>
<button @click="getData(timeR,this.selected)">Submit</button>
  </div>


  </div>

</template>

<script>
//Import Navbar
import NavBar from '../components/NavBar.vue'
import logTab from '../components/logTable'
import {mapState, mapActions} from 'vuex'
import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
import {router} from "../routes"
import { db } from "../firebase";
export default {
  data() {
    return {
      title: "Log",
        timeR: null,
        selected: "",
        S_order: [],
        D_order: [],
        tempOrd: [],
    }
  },
  methods: {
    getData(date,odrby){
      
    },
  },
  created(){
     if(!this.user){
  router.push("/")}
  db.collection('orders').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.tempOrd.push(doc.data())
        this.tempOrd.push(doc.ref.collection('detail'))
        console.log(this.tempOrd)
        this.S_order.push(this.tempOrd)
        this.tempOrd = []
      })
    })
    db.collection('delivery_orders').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.tempOrd.push(doc.data())
        this.tempOrd.push(doc.ref.collection('detail'))
        console.log(this.tempOrd)
        this.D_order.push(this.tempOrd)
        this.tempOrd = []
      })
    })
  },
    computed: {
    ...mapState({
      alert: state => state.alert
    }),
    ...mapState('account', ['user']),
  },
  components: {
    NavBar, DatePicker,
    logTab
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
