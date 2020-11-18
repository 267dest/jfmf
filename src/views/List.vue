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
          <AddFormCard v-bind:addProduct="addProduct" v-bind:addPro="addPro"/>
          <b-button class="switch-mode-btn" v-on:click="switchMode" v-if="stockModeOn"
            >Switch to Sell Mode</b-button
          >
          <b-button class="switch-mode-btn" v-on:click="switchMode" v-else
            >Switch to Stock Mode</b-button
          >
        </b-col>
      </b-row>

      <br />

      <b-row cols="4">
        <b-col
          align="center"
          class="border border-dark"
          id="meat-detail-card"
          v-for="product in products"
          :key="product.p_id"
        >
          <!-- <MeatCard v-bind:product="product" /> -->
          <Meat-card :product_id="product.p_id" :product_name="product.p_name" 
          :product_desc="product.p_description" :product_qty="product.p_qty" />
          <div v-if="stockModeOn === true">
            <b-button id="add-btn" contain v-on:click="addQty"> Add stock </b-button>
            <ProductFormCard title="Edit"/>
            <!-- <b-button id="edit-btn" contain v-on:click="edit"> Edit </b-button> -->
            <b-button id="delete-btn" contain v-on:click="deletePro(product.p_id)"> Delete </b-button>
          </div>
          <div v-else>
            <b-button id="sell-btn" contain v-on:click="sell"> Sell </b-button>
          </div>
          <br />
        </b-col>
      </b-row>
      
    </b-container>
    <br />
  </div>
</template>

<script>
//Import Navbar
import NavBar from "../components/NavBar.vue";
//Import MeatCard
import MeatCard from "../components/MeatCard.vue";
//Import EditFormCard
import ProductFormCard from "../components/ProductFormCard.vue";
//Import AddFormCard
import AddFormCard from "../components/AddFormCard.vue";

import { firestore } from "firebase";
import { db, productCol } from "../firebase";

export default {
  data() {
    return {
      title: "List",
      products: [],
      stockModeOn: false,
      addProduct: {
        id: "",
        name: "",
        description: "",
        qty: 0,
      },
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
    };
  },
  firestore() {
    return {
      // products: productCol.get().then((snapshot) => {
      //   snapshot.docs.forEach(doc => {
      //     this.products.push(doc)
      //     console.log(doc.data())
      //   })
      // })
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    switchMode: function (event) {
      if (this.stockModeOn) this.stockModeOn = false;
      else {
        this.stockModeOn = true;
      }
    },
    getProducts: function () {
      db.collection('products').get().then(querySnapshot => {
        const products = []
        querySnapshot.forEach(doc => {
          products.push(doc.data())
          console.log(doc.data())
        })
        this.products = products
      })
    },
    addPro: function () {
      db.collection('products').doc(this.addProduct.id).set( {
        p_id: this.addProduct.id,
        p_name: this.addProduct.name,
        p_description: this.addProduct.description,
        p_qty: this.addProduct.qty
      } ).then(this.getProducts)
      this.addProduct.id = ""
      this.addProduct.name = ""
      this.addProduct.description = ""
      this.addProduct.qty = 0
    },
    sell: function (event) {
    },
    addQty: function (event) {
    },
    edit: function (event) {
    },
    deletePro: function (product_id) {
      db.collection('products')
        .where('p_id', '==', product_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete().then(this.getProducts)
          })
        })
    }
  },
  components: {
    NavBar,
    MeatCard,
    ProductFormCard,
    AddFormCard
  },
};
</script>

<style scoped>
.switch-mode-btn {
  font-size: 1.25vw;
}

.add-product-btn {
  font-size: 1.25vw;
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

