<template>
  <div>
    <b-button class="addproduct-btn" variant="outline-info" v-b-modal.modal-add-product>Add Product</b-button>
        <b-modal id="modal-add-product" title="ADD PRODUCT" size="md" @ok="addPro">
          <div class="form-body">
          <div>
            ID
            <br/>
            <input type="text" v-model="addProduct.id" class="validate" placeholder="ID">
          </div>
          <div>
            Name
            <br />
            <input type="text" v-model="addProduct.name" class="validate" placeholder="Name">
          </div>
          <div>
            Description
            <br />
            <input type="text" v-model="addProduct.description" class="validate" placeholder="Description">
          </div>
          <div>
            Price
            <br />
            <input type="text" v-model.number="addProduct.price" class="validate" placeholder="Price">
          </div>
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

.form-body {

    text-align: center;
    font-size: 1em; 
    letter-spacing: 1px;
    font-weight: 300;
   
}

.addproduct-btn{
    width: 200px;
    margin: 4px 2px;
}

  input[type=text] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

</style>