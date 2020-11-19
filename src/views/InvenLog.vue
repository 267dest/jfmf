<template>
<!-- This is template for inserting navBar to files -->
  <div>
    <!-- Use NavBar -->
    <nav-bar></nav-bar>

    <h1> {{ title }} </h1>

    <div id="inventLog_table">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Username</th>
            <th>date</th>
            <th>time</th>
            <th>activity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inventLog in inventLogs" :key="inventLog.num">
            <td>{{inventLog.Username}}</td>
            <td> {{ inventLog.date }} </td>
            <td> {{ inventLog.time }} </td>
            <td> {{ inventLog.activity }} </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
//Import Navbar
import NavBar from '../components/NavBar.vue'
export default {
  data() {
    return {
      title: 'Inventory Log',
      //Test
      inventLogs: [
{       
        num: 1 ,
        Username: 'Abra' ,
        date: '09/10/2022' ,
        time: '14:02:53'  ,
        activity: 'sale' ,
  },
  {
      num: 2 ,
      Username: 'Abby' ,
      date: '08/11/2022',
      time: '15:05:53',
      activity: 'check' ,
  }
      ]
    }
  },
  created(){
     if(!this.user){
  router.push("/")}
  },
  methods: {
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
