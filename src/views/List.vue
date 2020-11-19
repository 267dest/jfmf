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
          <div v-if="stockModeOn === true">

            <div v-if="editId === product.p_id"
              class="collection-item products__list-item">
              <ProductFormCard 
                v-bind:editProduct="editProduct" 
                v-bind:onCancel="onCancel"
                v-bind:onEditSubmit="onEditSubmit"
                />
            </div>
            
            <div v-else>
              <Meat-card :product_id="product.p_id" :product_name="product.p_name" 
              :product_desc="product.p_description" :product_qty="product.p_qty" 
              :product_price="product.p_price"/>
              <div v-if="addProductQty.id === product.p_id">
                
                <AddProQtyCard 
                v-bind:addProductQty="addProductQty"
                v-bind:onCancelAddProQty="onCancelAddProQty"
                v-bind:onAddProQtySubmit="onAddProQtySubmit"
                v-bind:product="product"/>

              </div>
              <div v-else>
                <div v-if="deleteProId === product.p_id">
                  <b-button @click="onCancelDelete">Cancel</b-button>
                  <b-button @click="onDeleteSubmit(product.p_id)">Confirm</b-button>
                </div>
                <div v-else>
                  <b-button id="add-btn" contain @click="addQty(product)"> Add stock </b-button>
                  <b-button @click="edit(product)">Edit</b-button>
                  <b-button id="delete-btn" contain @click="deletePro(product)"> Delete </b-button>
                </div>
              </div>
            </div>

          </div>
          <div v-else>
            <Meat-card :product_id="product.p_id" :product_name="product.p_name" 
            :product_desc="product.p_description" :product_qty="product.p_qty" 
            :product_price="product.p_price" />
            <div v-if="sellProduct.id === product.p_id">
              <SellFormCard 
              v-bind:sellProduct="sellProduct"
              v-bind:onCancelSell="onCancelSell"
              v-bind:onSellSubmit="onSellSubmit"
              v-bind:product="product"/>
            </div>
            <div v-else>
              <b-button id="sell-btn" contain @click="sell(product)"> Sell </b-button>
            </div>
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
//Import AddProQtyCard
import AddProQtyCard from "../components/AddProQtyCard.vue";
//Import SellFormCard
import SellFormCard from "../components/SellFormCard.vue";

import {mapState, mapActions} from 'vuex'

import { firestore } from "firebase";
import { db, productCol } from "../firebase";
import { router } from '../routes';

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
        price: 0
      },
      editId: "",
      editProduct: {
        id: "",
        name: "",
        description: "",
        qty: 0,
        price: 0
      },
      addProductQty: {
        id: "",
        qty: 1
      },
      deleteProId: "",
      sellProduct: {
        id: "",
        qty: 1
      }
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
    if(!this.user){
      router.push("/")
    }
    this.getProducts()
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
    ...mapState('account', ['user']),
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
          // console.log(doc.data())
        })
        this.products = products
      })
    },
    // Add new product to database
    addPro: function () {
      db.collection('products').doc(this.addProduct.id).set( {
        p_id: this.addProduct.id,
        p_name: this.addProduct.name,
        p_description: this.addProduct.description,
        p_qty: this.addProduct.qty,
        p_price: this.addProduct.price
      } ).then(this.getProducts)
      this.addProduct.id = ""
      this.addProduct.name = ""
      this.addProduct.description = ""
      this.addProduct.qty = 1
      this.addProduct.price = 0
    },
    // Sell product
    sell: function (product) {
      this.sellProduct.id = product.p_id
    },
    onCancelSell: function () {
      this.sellProduct.id = ""
      this.sellProduct.qty = 1
    },
    onSellSubmit: function (product) {
      db.collection('products')
        .where('p_id', '==', this.sellProduct.id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              p_qty: product.p_qty - this.sellProduct.qty,
            }).then(this.getProducts)
          })
          this.onCancelSell()
        })
    },
    // Add quantity of the selected product
    addQty: function (product) {
      this.addProductQty.id = product.p_id
      this.addProductQty.qty = 1
    },
    onCancelAddProQty: function () {
      this.addProductQty.id = ""
      this.addProductQty.qty = 1
    },
    onAddProQtySubmit: function (product) {
      db.collection('products')
        .where('p_id', '==', this.addProductQty.id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              p_qty: this.addProductQty.qty + product.p_qty,
            }).then(this.getProducts)
          })
          this.onCancelAddProQty()
        })
    },
    // Delete product
    deletePro: function (product) {
      this.deleteProId = product.p_id
    },
    onCancelDelete: function () {
      this.deleteProId = ""
    },
    onDeleteSubmit: function (product_id) {
      db.collection('products')
        .where('p_id', '==', product_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete().then(this.getProducts)
          })
        })
    },
    // Edit detail of the selected product
    edit: function (product) {
      this.editId = product.p_id
      this.editProduct.name = product.p_name
      this.editProduct.id = product.p_id
      this.editProduct.description = product.p_description
      this.editProduct.qty = product.p_qty
      this.editProduct.price = product.p_price
    },
    onCancel: function () {
      this.editId = ""
      this.editProduct.name = ""
      this.editProduct.id = ""
      this.editProduct.description = ""
      this.editProduct.qty = 1
      this.editProduct.price = 0
    },
    onEditSubmit: function () {
      db.collection('products')
        .where('p_id', '==', this.editId).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.set({
              p_id: this.editId,
              p_name: this.editProduct.name,
              p_description: this.editProduct.description,
              p_qty: this.editProduct.qty,
              p_price: this.editProduct.price
            }).then(this.getProducts)
          })
          this.onCancel()
        })
    }
  },
  components: {
    NavBar,
    MeatCard,
    ProductFormCard,
    AddFormCard,
    AddProQtyCard,
    SellFormCard
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

