<template>
  <div class="sell-footer">
    Input amount
    <br />
    <input
      id="input-amount-box"
      v-model.number="sellProduct.qty"
      class="validate"
      :placeholder="sellProduct.qty"
    />
    <div>
      <b-button variant="outline-secondary" id="cancle-sell-btn" @click="onCancelSell">Cancel</b-button>
      <b-button variant="success" id="confirm-sell-btn" @click="onAddSell()">Confirm</b-button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['sellProduct', 'onCancelSell', 'onAddSell']
}
</script>

<style>
.sell-footer {
  margin: 10px;
  color: green;
}

#cancle-sell-btn {
  margin-top: 5px;
}

#confirm-sell-btn {
  margin-top: 5px;
}

#input-amount-box {
  width: 100%;
}


</style>