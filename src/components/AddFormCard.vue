<template>
  <div>
    <b-button v-b-modal.modal-add-product>Add Product</b-button>
        <b-modal id="modal-add-product" title="Add Product" @ok="addPro">
          <div>
            ID
            <br />
            <input v-model="addProduct.id" class="validate" placeholder="ID">
          </div>
          <div>
            Name
            <br />
            <input v-model="addProduct.name" class="validate" placeholder="Name">
          </div>
          <div>
            Description
            <br />
            <input v-model="addProduct.description" class="validate" placeholder="Description">
          </div>
          <div>
            Price
            <br />
            <input v-model.number="addProduct.price" class="validate" placeholder="Price">
          </div>
        </b-modal>
  </div>
</template>

<script>
import { firestore } from "firebase";
import { db, productCol } from "../firebase";
export default {
    props: ['addProduct', 'addPro'],
};
</script>

<style>
</style>