<template>
  <div>
    <div>
      <img src="../assets/wagyuBeef.png" class="meat-img" contain />
    </div>
    <div id="font-id">
      <span>{{ p_id }}</span>
    </div>
    <div id="font-name">
      <span>{{ p_name }}</span>
    </div>
    <div id="font-desc">
      <span>{{ p_desc }}</span>
    </div>
    <div id="font-qty">
      <span>Quantity: {{ p_qty }}</span>
    </div>
    <div id="font-price">
      <span>Price: {{ p_price }}</span>
    </div>
    <div id="font-price" v-if="stockMode === true">
      <span>In Price: {{ p_inprice }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    product_id: {
      type: String, 
      default: "Null"
    },
    product_name: {
      type: String,
      default: "Null"
    },
    product_desc: {
      type: String,
      default: "Null"
    },
    product_qty: {
      type: Number,
      default: 0
    },
    product_price: {
      type: Number,
      default: 0
    },
    product_inprice: {
      type: Number,
      default: 0
    },
    stockModeOn: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return { 
      p_id: this.product_id,
      p_name: this.product_name,
      p_desc: this.product_desc,
      p_qty: this.product_qty,
      p_price: this.product_price,
      p_inprice: this.product_inprice,
      stockMode: this.stockModeOn,
    };
  },
};
</script>

<style>
.meat-img {
  height: 12vw;
}

#font-id, #font-name {
  font-size: 30px;
  text-align: left;
}

#font-qty, #font-desc, #font-price {
  font-size: 16px;
  text-align: left;
}
</style>