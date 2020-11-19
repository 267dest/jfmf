<template>
  <div>
    <div>
      <img src="../assets/wagyuBeef.png" class="meat-img" contain />
    </div>
    ID : {{ editProduct.id }}
    <br />
    Name
    <br />
    <input
      v-model="editProduct.name"
      class="validate"
      :placeholder="editProduct.name"
    />
    <br />
    Description
    <br />
    <textarea
      v-model="editProduct.description"
      class="validate"
      :placeholder="editProduct.description"
    ></textarea>
    <br />
    Quantity
    <br />
    <input
      v-model.number="editProduct.qty"
      class="validate"
      :placeholder="editProduct.qty"
    />
    <br />
    Price
    <br />
    <input
      v-model.number="editProduct.price"
      class="validate"
      :placeholder="editProduct.price"
    />
    <br />
    <br />
    <div>
      <b-button variant="outline-secondary" @click="onCancel">Cancel</b-button>
      <b-button variant="primary" @click="onEditSubmit">Confirm</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['editProduct', 'onCancel', 'onEditSubmit'],
  
};
</script>

<style>
</style>