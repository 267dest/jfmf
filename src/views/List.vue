<template>
  <div>
    <nav-bar />
    <b-container id="meat-cards-container">
      <br />
      <b-row cols="3">
        <b-col></b-col>
        <b-col align="center">
          <h1 class="border border-dark" id="title-card">{{ title }}</h1>
        </b-col>
        <b-col align="end">
          <b-button class="switch-mode-btn" v-on:click="switchMode" v-if="stockModeOn"
            >Switch to Sell Mode</b-button
          >
          <b-button class="switch-mode-btn" v-on:click="switchMode" v-else
            >Switch to Stock Mode</b-button
          >
        </b-col>
      </b-row>

      <br />

      <div v-if="stockModeOn === true">
        <b-row cols="2">
          <b-col
            align="center"
            class="border border-dark"
            id="meat-detail-card"
            v-for="product in products"
            :key="product.p_id"
          >
            <p>{{product.p_id}}</p>
            <!-- <MeatCard v-bind:product="product" /> -->
            <Meat-card :product_id="product.p_id" :product_name="product.p_name" 
            :product_desc="product.p_description" :product_qty="product.qty" />
            <br />
          </b-col>
        </b-row>
      </div>

      <div v-else>
        <b-row cols="2">
          <b-col
            align="center"
            class="border border-dark"
            id="meat-detail-card"
            v-for="product in products"
            :key="product.p_id"
          >
            <MeatCard v-bind:product="product" />
            <b-button id="sell-btn" contain v-on:click="sell"> Sell </b-button>
            <br />
            <br />
          </b-col>
        </b-row>
      </div>
    </b-container>
    <br />
  </div>
</template>

<script>
//Import Navbar
import NavBar from "../components/NavBar.vue";
//Import MeatCard
import MeatCard from "../components/MeatCard.vue";

import { firestore } from "firebase"
import { db, productCol } from "../firebase"

export default {
  data() {
    return {
      title: "List",
      //Testing Examples
      // meatList: [
      //   {
      //     meatImg: "../assets/wagyuBeef.png",
      //     meatName: "Wagyu Beef",
      //     meatDescription: "Soft and tender on the outside and inside.",
      //     meatQuantity: 10,
      //   },
      //   {
      //     meatImg: "../assets/wagyuBeef.png",
      //     meatName: "Pork Tenderloin",
      //     meatDescription: "Tender on the outside and inside.",
      //     meatQuantity: 50,
      //   },
      //   {
      //     meatImg: "../assets/wagyuBeef.png",
      //     meatName: "Pork Loin",
      //     meatDescription: "Soft and tender on the inside.",
      //     meatQuantity: 20,
      //   },
      //   {
      //     meatImg: "../assets/wagyuBeef.png",
      //     meatName: "Ground Pork",
      //     meatDescription: "Pork that had been grounded.",
      //     meatQuantity: 30,
      //   },
      //   {
      //     meatImg: "../assets/wagyuBeef.png",
      //     meatName: "Ground Beef",
      //     meatDescription: "Beef that had been grounded.",
      //     meatQuantity: 40,
      //   },
      //   {
      //     meatImg: "../assets/wagyuBeef.png",
      //     meatName: "Beef Tenderloin",
      //     meatDescription: "Tender on the outside and inside.",
      //     meatQuantity: 60,
      //   },
      // ],
      stockModeOn: true,
    };
  },
  firestore() {
    return { products: productCol }
  },
  methods: {
    switchMode: function (event) {
      if (this.stockModeOn) this.stockModeOn = false;
      else {
        this.stockModeOn = true;
      }
    },
    sell: function (event) {
    }
  },
  components: {
    NavBar,
    MeatCard,
  },
};
</script>

<style>
.switch-mode-btn {
  font-size: 2vw;
}

#meat-cards-container {
  padding: 0px;
}

#title-card {
  font-size: 3vw;
  background: #e8eaec;
}

#meat-detail-card {
  color: grey;
  background: #e8eaec;
  border-radius: 10px;
}

#sell-btn {
  width: 5vw;
  height: 3vw;
}
</style>

