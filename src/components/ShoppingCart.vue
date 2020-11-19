<template>
  <div align="center">
    <h1>Shopping Cart</h1>
    <b-row cols="3">
      <b-col>
        <span>Product ID</span>
      </b-col>
      <b-col>
        <span>Amount</span>
      </b-col>
      <b-col></b-col>
    </b-row>
    <div v-for="(item, key) in shoppingCart" :key="key">
      <b-row cols="3">
        <b-col>
          <span>{{ item.id }}</span>
        </b-col>
        <b-col>
          <span>{{ item.qty }}</span>
        </b-col>
        <b-col>
          <b-button @click="removeProduct(key)">Remove</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
    props: ['shoppingCart', 'removeProduct']
};
</script>

<style>
</style>