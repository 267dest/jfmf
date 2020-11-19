<template>
  <div>
    <div>
      <img src="../assets/wagyuBeef.png" class="meat-img" contain />
    </div>
    <div id="font-style1">
      <span>{{ p_id }}</span>
    </div>
    <div id="font-style1">
      <span>{{ p_name }}</span>
    </div>
    <div id="font-style2">
      <span>{{ p_desc }}</span>
    </div>
    <div id="font-style2">
      <span>Quantity: {{ p_qty }}</span>
    </div>
    <div id="font-style2">
      <span>Price: {{ p_price }}</span>
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
    }
  },

  data() {
    return { 
      p_id: this.product_id,
      p_name: this.product_name,
      p_desc: this.product_desc,
      p_qty: this.product_qty,
      p_price: this.product_price
    };
  },
};
</script>

<style>
.meat-img {
  height: 12vw;
}

#meat-name-span {
  font-size: 3vw;
  color: grey;
}

#font-style1 {
  font-size: 3vw;
}

#font-style2 {
  font-size: 2vw;
}
</style>