<template>
  <div>
    <div>
      <img src="../assets/wagyuBeef.png" class="meat-img" contain />
    </div>
    <div id="font-style1">
      <span>{{ meatDetail.meatName }}</span>
    </div>
    <div id="font-style2">
      <span>{{ meatDetail.meatDescription }}</span>
    </div>
    <div id="font-style2">
      <span>Quantity: {{ meatDetail.meatQuantity }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["meatDetail"],

  data() {
    return {};
  },
};
</script>

<style scoped>
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