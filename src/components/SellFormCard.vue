<template>
  <div>
    Input amount
    <br />
    <input
      v-model.number="sellProduct.qty"
      class="validate"
      :placeholder="sellProduct.qty"
    />
    <div>
      <b-button @click="onCancelSell">Cancel</b-button>
      <b-button @click="onAddSell()">Confirm</b-button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['sellProduct', 'onCancelSell', 'onAddSell']
}
</script>

<style>

</style>