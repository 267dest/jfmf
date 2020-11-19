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
<button @click="getData()">Submit</button>
  </div>
  <div v-if="showBoo">
  <log-table :ODrinit="selected" :DOinit="D_order" :SOinit="S_order" :Dainit="timeR"></log-table>
  <button @click="hide()">Close</button>
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
import LogTable from '../components/logTable.vue';
import moment from 'moment';
export default {
  data() {
    return {
      showBoo: false,
      title: "Log",
        timeR: null,
        selected: "",
        S_order: [],
        D_order: [],
        tempOrd: [],
    }
  },
  methods: {
    getData(){
      this.showBoo = true
    },
    hide(){
      this.showBoo = false
    }
  },
  created(){
    if(!this.user){
      router.push("/")
    }
    this.showBoo = false
    db.collection('orders').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.tempOrd.push(doc.data())
        console.log(doc.data())
        this.tempOrd[0].date = this.tempOrd[0].date.toDate()
        db.collection('orders').doc(doc.data().o_id).collection('detail').get().then(querySnapshot2 => {
          var tmpList = []
          // tmpList.push(doc.data().o_id)
          querySnapshot2.forEach(doc2 => {
            tmpList.push(doc2.data())
            // console.log(doc2.data())
          })
          this.tempOrd.push(tmpList)
          // console.log(tmpList)
        })
        // console.log(this.tempOrd)
        this.S_order.push(this.tempOrd)
        this.tempOrd = []
      })
      // console.log(this.S_order)
    })
    db.collection('delivery_orders').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.tempOrd.push(doc.data())
        this.tempOrd.push(doc.ref.collection('detail'))
        this.tempOrd[0].do_date = this.tempOrd[0].do_date.toDate()
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
    logTab,
    LogTable
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
