<template>
  <div>
    Input amount
    <br />
    <input
      v-model.number="addProductQty.qty"
      class="validate"
      :placeholder="addProductQty.qty"
    />
    <br />
    Input price
    <br />
    <input
      v-model.number="addProductQty.price"
      class="validate"
      :placeholder="addProductQty.price"
    />
    <div>
      <b-button @click="onCancelAddProQty">Cancel</b-button>
      <b-button @click="onAddToCart()">Confirm</b-button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['addProductQty', 'onCancelAddProQty', 'onAddToCart'],
}
</script>

<style>

</style>