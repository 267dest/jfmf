<template>
  <div>
    <nav-bar></nav-bar>
    <div class="menu-log-bar">
      <date-picker v-model="timeR" range></date-picker>

      <select v-model="selected">
        <option disabled value="">Please select order type</option>
        <option>Sale_log</option>
        <option>Stock_log</option>
      </select>
      <span>Selected: {{ selected }}</span>
      <button
        id="submit-date-btn"
        style="width: 10%; margin-left: 10px"
        class="btn btn-info"
        @click="getData()"
      >
        Submit
      </button>
      <button
        id="submit-log-btn"
        style="width: 10%"
        class="btn btn-outline-secondary"
        @click="hide()"
      >
        Clear
      </button>
    </div>
    <div v-if="showBoo">
      <log-table
        v-if="selected == 'Sale_log'"
        :ODrinit="selected"
        :DOinit="S_detail"
        :SOinit="S_order"
        :Dainit="timeR"
      ></log-table>
      <log-table
        v-if="selected == 'Stock_log'"
        :ODrinit="selected"
        :DOinit="D_detail"
        :SOinit="D_order"
        :Dainit="timeR"
      ></log-table>
    </div>
  </div>
</template>

<script>
//Import Navbar
import NavBar from "../components/NavBar.vue";
import logTab from "../components/logTable";
import { mapState, mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { router } from "../routes";
import { db } from "../firebase";
import LogTable from "../components/logTable.vue";
import moment from "moment";
import firebase from "firebase";
export default {
  data() {
    return {
      showBoo: false,
      title: "Log",
      timeR: null,
      selected: "",
      S_order: [],
      S_detail: [],
      D_order: [],
      D_detail: [],
      tempOrd: [],
      tmpList: [],
    };
  },
  methods: {
    getData() {
      this.showBoo = true;
    },
    hide() {
      this.showBoo = false;
    },
  },
  created() {
    if (!this.user) {
      router.push("/");
    }
    this.showBoo = false;
    db.collection("orders")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.S_order.push({
            o_id: doc.data().o_id,
            o_total: doc.data().o_total,
            date: doc.data().date.toDate(),
          });
          console.log(this.S_order);
        });
      });
    db.collection("orders_detail")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.get("o_id"));
          this.S_detail.push({
            o_id: doc.get("o_id"),
            p_id: doc.get("p_id"),
            o_price: doc.get("o_price"),
            o_amount: doc.get("o_amount"),
          });
        });
      });
    db.collection("delivery_orders")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.D_order.push({
            o_id: doc.data().do_id,
            o_total: 0,
            date: doc.data().do_date.toDate(),
          });
          console.log(this.D_order);
        });
      });
    db.collection("delivery_detail")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.get("do_id"));
          this.D_detail.push({
            o_id: doc.get("do_id"),
            p_id: doc.get("p_id"),
            o_amount: doc.get("d_amount"),
            o_price: 0,
          });
        });
      });
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
    ...mapState("account", ["user"]),
  },
  components: {
    NavBar,
    DatePicker,
    logTab,
    LogTable,
  },
};
</script>

<style>
table,
tr,
td {
  border: 1px solid black;
}
.menu-log-bar {
  margin: 10px;
}

#submit-date-btn,
#submit-log-btn {
  width: 10%;
  margin-left: 5px;
}
</style>
