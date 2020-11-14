<template>
<!-- This is template for inserting navBar to files -->
  <div>
    <!-- Use NavBar -->
    <nav-bar></nav-bar>
    <h1> {{ title }} </h1>

    <div id="employee-table">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Employee name</th>
            <th>Employee email</th>
            <th>Employee position</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td> {{ employee.name }} </td>
            <td> {{ employee.email }} </td>
            <td> {{ employee.position }} </td>
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
      title: 'Member management',
      //member lists testing
      employees: [
        {
          id: 1,
          name: 'Steve',
          email: 'steve@email.com',
          position: 'Owner'
        },
        {
          id: 2,
          name: 'Bobby',
          email: 'bobby@gmail.com',
          position: 'Sale staff'
        }
        ]
    }
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
