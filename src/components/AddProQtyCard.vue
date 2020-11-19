<template>
  <div>
    Input amount
    <br />
    <input
      v-model.number="addProductQty.qty"
      class="validate"
      :placeholder="addProductQty.qty"
    />
    <div>
      <b-button @click="onCancelAddProQty">Cancel</b-button>
      <b-button @click="onAddProQtySubmit(product)">Confirm</b-button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['addProductQty', 'onCancelAddProQty', 'onAddProQtySubmit', 'product'],
}
</script>

<style>

</style>