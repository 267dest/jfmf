<template>
  <div>
    <nav-bar />
    <b-container id="meat-cards-container">
      <br />
      <b-row cols="3">
        <b-col>
          <b-button
            variant="warning"
            id="confirm-sell-btn"
            contain
            v-b-modal.modal-confirm-sell-product
            v-if="!stockModeOn"
            @click="calcTotalPrice"
          >
            Confirm Sell
          </b-button>
          <b-modal
            id="modal-confirm-sell-product"
            title="CONFIRM SELL"
            @ok="onSellSubmit(shoppingCart)"
          >
            <b-row cols="3" align="center">
              <b-col>
                <span>Product ID</span>
              </b-col>
              <b-col>
                <span>Amount</span>
              </b-col>
              <b-col>
                <span>Price</span>
              </b-col>
            </b-row>
            <div v-for="(item, key) in shoppingCart" :key="key">
              <b-row cols="3" align="center">
                <b-col>
                  <span>{{ item.id }}</span>
                </b-col>
                <b-col>
                  <span>{{ item.qty }}</span>
                </b-col>
                <b-col>
                  <span>{{ item.price }}</span>
                </b-col>
              </b-row>
            </div>
            <b-row cols="3">
              <b-col></b-col>
              <b-col>
                <span>Total Price: {{ totalPrice }}</span>
              </b-col>
              <b-col></b-col>
            </b-row>
          </b-modal>

          <b-button
            variant="warning"
            id="confirm-add-btn"
            contain
            v-b-modal.modal-confirm-add-stock
            v-if="stockModeOn"
            @click="calcTotalPriceAdd"
          >
            Confirm Add Stock
          </b-button>
          <b-modal
            id="modal-confirm-add-stock"
            title="CONFIRM ADD STOCK"
            @ok="onAddProQtySubmit(stockCart)"
          >
            <b-row cols="3" align="center">
              <b-col>
                <span>Product ID</span>
              </b-col>
              <b-col>
                <span>Amount</span>
              </b-col>
              <b-col>
                <span>Price</span>
              </b-col>
            </b-row>
            <div v-for="(item, key) in stockCart" :key="key">
              <b-row cols="3" align="center">
                <b-col>
                  <span>{{ item.id }}</span>
                </b-col>
                <b-col>
                  <span>{{ item.qty }}</span>
                </b-col>
                <b-col>
                  <span>{{ item.price }}</span>
                </b-col>
              </b-row>
            </div>
            <b-row cols="3">
              <b-col></b-col>
              <b-col>
                <span>Total Price: {{ totalPriceAdd }}</span>
              </b-col>
              <b-col></b-col>
            </b-row>
          </b-modal>
        </b-col>
        <b-col align="center">
          <h1 id="title-card">{{ title }}</h1>
        </b-col>
        <b-col align="end">
        
          <AddFormCard 
            v-bind:addProduct="addProduct" 
            v-bind:addPro="addPro" 
          />
          <b-button
            variant="outline-primary"
            class="switch-mode-btn"
            v-on:click="switchMode"
            v-if="stockModeOn"
            >Switch to Sell Mode</b-button
          >
          <b-button
          
            variant="outline-primary"
            class="switch-mode-btn"
            v-on:click="switchMode"
            v-else
            >Switch to Stock Mode</b-button
          >

        </b-col>
      </b-row>

      <br />

      <div id="meat-detail-card" v-if="stockModeOn">
        <div align="center">
          <h1>Stock Cart</h1>
          <b-row cols="3">
            <b-col>
              <span>Product ID</span>
            </b-col>
            <b-col>
              <span>Amount</span>
            </b-col>
            <b-col></b-col>
          </b-row>
          <div v-for="(item, key) in stockCart" :key="key">
            <b-row cols="3">
              <b-col style="margin-top: 20px;">
                <span>{{ item.id }}</span>
              </b-col>
              <b-col style="margin-top: 20px;">
                <span>{{ item.qty }}</span>
              </b-col>
              <b-col style="margin-top: 10px;">
                <b-button variant="outline-danger" @click="removeProStock(key)">Remove</b-button>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>

      <div id="meat-detail-card" v-else>
        <ShoppingCart
          v-bind:shoppingCart="shoppingCart"
          v-bind:removeProduct="removeProduct"
        />
      </div>

      <br />

      <b-row cols="4">
        <b-col
          align="center"
          id="meat-detail-card-product"
          v-for="product in products"
          :key="product.p_id"
        >
          <div v-if="stockModeOn === true">
            <div
              v-if="editId === product.p_id"
              class="collection-item products__list-item"
            >
              <ProductFormCard
                v-bind:editProduct="editProduct"
                v-bind:onCancel="onCancel"
                v-bind:onEditSubmit="onEditSubmit"
                v-bind:product="product"
              />
            </div>

            <div v-else>
              <Meat-card
                :product_id="product.p_id"
                :product_name="product.p_name"
                :product_desc="product.p_description"
                :product_qty="product.p_qty"
                :product_price="product.p_price"
                :product_inprice="product.p_inprice"
                :stockModeOn="stockModeOn"
              />
              <br />
              <div v-if="addProductQty.id === product.p_id">
                <AddProQtyCard
                  v-bind:addProductQty="addProductQty"
                  v-bind:onCancelAddProQty="onCancelAddProQty"
                  v-bind:onAddToCart="onAddToCart"
                />
              </div>
              <div v-else>
                <div v-if="deleteProId === product.p_id">
                  <b-button variant="outline-secondary" @click="onCancelDelete">Cancel</b-button>
                  <b-button variant="danger" @click="onDeleteSubmit(product.p_id)"
                    >Confirm</b-button
                  >
                </div>
                <div v-else>
                  <b-button variant="success" id="add-btn" contain @click="addQty(product)">
                    Add to cart
                  </b-button>
                  <b-button variant="outline-secondary" id="edit-btn" @click="edit(product)">Edit</b-button>
                  <b-button variant="danger" id="delete-btn" contain @click="deletePro(product)">
                    Delete
                  </b-button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <Meat-card
              :product_id="product.p_id"
              :product_name="product.p_name"
              :product_desc="product.p_description"
              :product_qty="product.p_qty"
              :product_price="product.p_price"
              :product_inprice="product.p_inprice"
              :stockModeOn="stockModeOn"
            />
            <div v-if="sellProduct.id === product.p_id">
              <SellFormCard
                v-bind:sellProduct="sellProduct"
                v-bind:onCancelSell="onCancelSell"
                v-bind:onAddSell="onAddSell"
                v-bind:product="product"
              />
            </div>
            <div id="add-card-footer" v-else>
              <b-button variant="warning" id="sell-btn" contain @click="sell(product)">
                Add to shopping cart
              </b-button>
            </div>
          </div>
          <br />
        </b-col>
      </b-row>
    </b-container>
    <br />
  </div>
</template>

<script>
//Import Navbar
import NavBar from "../components/NavBar.vue";
//Import MeatCard
import MeatCard from "../components/MeatCard.vue";
//Import EditFormCard
import ProductFormCard from "../components/ProductFormCard.vue";
//Import AddFormCard
import AddFormCard from "../components/AddFormCard.vue";
//Import AddProQtyCard
import AddProQtyCard from "../components/AddProQtyCard.vue";
//Import SellFormCard
import SellFormCard from "../components/SellFormCard.vue";
//Import ShoppingCart
import ShoppingCart from "../components/ShoppingCart.vue";
//Import Timestamp
import { Timestamp } from "firebase";

import { mapState, mapActions } from "vuex";

import { firestore } from "firebase";
import { db, productCol } from "../firebase";
import { router } from "../routes";

export default {
  data() {
    return {
      title: "CATEGORY",
      products: [],
      stockModeOn: false,
      addProduct: {
        id: "",
        name: "",
        description: "",
        qty: 0,
        price: 0,
        inprice: 0,
      },
      editId: "",
      editProduct: {
        id: "",
        name: "",
        description: "",
        qty: 0,
        price: 0,
        inprice: 0,
      },
      addProductQty: {
        id: "",
        qty: 1,
        price: 0,
      },
      deleteProId: "",
      sellProduct: {
        id: "",
        qty: 1,
        price: 0,
      },
      shoppingCart: [],
      stockCart: [],
      totalPrice: 0,
      totalPriceAdd: 0,
      displayN: "",
    };
  },
  firestore() {
    return {
      // products: productCol.get().then((snapshot) => {
      //   snapshot.docs.forEach(doc => {
      //     this.products.push(doc)
      //     console.log(doc.data())
      //   })
      // })
    };
  },
  created() {
    if (!this.user) {
      router.push("/");
    }
    db.collection('staffs').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if(doc.get('email') == this.user.email){
          this.displayN = doc.get('username');
          // console.log(doc.get('username'));
        }
    })})
    this.getProducts();
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
    ...mapState("account", ["user"]),
  },
  methods: {
    switchMode: function (event) {
      if (this.stockModeOn) this.stockModeOn = false;
      else {
        this.stockModeOn = true;
      }
    },
    getProducts: function () {
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          const products = [];
          querySnapshot.forEach((doc) => {
            products.push(doc.data());
            // console.log(doc.data())
          });
          this.products = products;
        });
    },
    // Add new product to database
    addPro: function () {
      var sameId = false;
      var sameName = false;
      var addProTmp = this.addProduct;
      this.products.forEach(function (item) {
        if(item.p_id == addProTmp.id) {
          sameId = true;
        }
        if(item.p_name == addProTmp.name) {
          sameName = true;
        }
      })
      if(sameId) {
        alert("พบรหัสสินค้าในระบบ");
      } else if(sameName) {
        alert("พบชื่อสินค้าในระบบ");
      } else if(this.addProduct.price < 0 || this.addProduct.price > 10000 || 
      ((this.addProduct.price%1 != 0.25 && this.addProduct.price%1 != 0.5) && this.addProduct.price%1 > 0)) {
        alert("กรุณากรอกราคาขายของสินค้าให้ถูกต้อง");
      } else if(this.addProduct.inprice < 0 || this.addProduct.inprice > 10000 ||
      ((this.addProduct.inprice%1 != 0.25 && this.addProduct.inprice%1 != 0.5) && this.addProduct.inprice%1 > 0)) {
        alert("กรุณากรอกราคาซื้อของสินค้าให้ถูกต้อง");
      } else {
        db.collection("products")
          .doc(this.addProduct.id)
          .set({
            p_id: this.addProduct.id,
            p_name: this.addProduct.name,
            p_description: this.addProduct.description,
            p_qty: this.addProduct.qty,
            p_price: this.addProduct.price,
            p_inprice: this.addProduct.inprice,
          })
          .then(this.getProducts);
        this.addProduct.id = "";
        this.addProduct.name = "";
        this.addProduct.description = "";
        this.addProduct.qty = 1;
        this.addProduct.price = 0;
        this.addProduct.inprice = 0;
      }
    },
    // Sell product
    sell: function (product) {
      this.sellProduct.id = product.p_id;
      this.sellProduct.price = product.p_price;
    },
    onCancelSell: function () {
      this.sellProduct.id = "";
      this.sellProduct.qty = 1;
      this.sellProduct.price = 0;
    },
    onResetCart: function () {
      this.shoppingCart = [];
    },
    onAddSell: function (product) {
      if(this.sellProduct.qty > 0 && this.sellProduct.qty < 1000 && 
      this.sellProduct.qty <= product.p_qty && this.sellProduct.qty%1 == 0) {
        this.shoppingCart.push({
          id: this.sellProduct.id,
          qty: this.sellProduct.qty,
          price: this.sellProduct.qty * this.sellProduct.price,
        });
      } else {
        alert("กรุณากรอกจำนวนสินค้าให้ถูกต้อง");
      }
      this.onCancelSell();
    },
    onSellSubmit: function (shoppingCart) {
      const today = new Date();
      var monthTmp = today.getMonth() + 1;
      if (monthTmp < 10) monthTmp = "0" + monthTmp;
      var dateTmp = today.getDate();
      if (dateTmp < 10) dateTmp = "0" + dateTmp;
      var hourTmp = today.getHours();
      if (hourTmp == 0) hourTmp = "00";
      else if (hourTmp < 10) hourTmp = "0" + hourTmp;
      var minTmp = today.getMinutes();
      if (minTmp == 0) minTmp = "00";
      else if (minTmp < 10) minTmp = "0" + minTmp;
      const infoDate =
        today.getFullYear() -
        2000 +
        "" +
        monthTmp +
        "" +
        dateTmp +
        "" +
        hourTmp +
        "" +
        minTmp;

      db.collection("orders").doc(infoDate).set({
        o_id: infoDate,
        date: today,
        o_total: this.totalPrice,
        username: this.displayN,
      });
      var currentProducts = this.products;
      var currentQty = 0;
      shoppingCart.forEach(function (item) {
        db.collection("orders_detail")
          .doc(infoDate+item.id)
          .set({
            p_id: item.id,
            o_amount: item.qty,
            o_price: item.price,
            o_id: infoDate,
            od_id: infoDate+item.id
          });
        currentProducts.forEach(function (eachPro) {
          if (eachPro.p_id == item.id) {
            currentQty = eachPro.p_qty;
            // console.log(currentQty)
          }
        });
        db.collection("products")
          .where("p_id", "==", item.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({
                p_qty: currentQty - item.qty,
              });
            });
          });
      });
      alert("บันทึกการขายเรียบร้อย");
      this.reload();
      this.onResetCart();
    },
    // Add quantity of the selected product
    addQty: function (product) {
      this.addProductQty.id = product.p_id;
      this.addProductQty.qty = 1;
      this.addProductQty.price = product.p_inprice;
    },
    onCancelAddProQty: function () {
      this.addProductQty.id = "";
      this.addProductQty.qty = 1;
      this.addProductQty.price = 0;
    },
    onAddToCart: function () {
      if(this.addProductQty.qty > 0 && this.addProductQty.qty < 1000 && 
      this.addProductQty.qty%1 == 0) {
        this.stockCart.push({
          id: this.addProductQty.id,
          qty: this.addProductQty.qty,
          price: this.addProductQty.qty*this.addProductQty.price
        });
      } else {
        alert("กรุณากรอกจำนวนสินค้าให้ถูกต้อง");
      }
      this.onCancelAddProQty();
    },
    onResetStockCart: function () {
      this.stockCart = [];
    },
    onAddProQtySubmit: function (stockCart) {
      const today = new Date();
      var monthTmp = today.getMonth() + 1;
      if (monthTmp < 10) monthTmp = "0" + monthTmp;
      var dateTmp = today.getDate();
      if (dateTmp < 10) dateTmp = "0" + dateTmp;
      var hourTmp = today.getHours();
      if (hourTmp == 0) hourTmp = "00";
      else if (hourTmp < 10) hourTmp = "0" + hourTmp;
      var minTmp = today.getMinutes();
      if (minTmp == 0) minTmp = "00";
      else if (minTmp < 10) minTmp = "0" + minTmp;
      const infoDate =
        today.getFullYear() -
        2000 +
        "" +
        monthTmp +
        "" +
        dateTmp +
        "" +
        hourTmp +
        "" +
        minTmp;

      db.collection("delivery_orders").doc(infoDate).set({
        do_id: infoDate,
        do_date: today,
        do_total: this.totalPriceAdd,
        username: this.displayN,
      });
      var currentProducts = this.products;
      var currentQty = 0;
      stockCart.forEach(function (item) {
        db.collection("delivery_detail")
          .doc(infoDate+item.id)
          .set({
            dd_id: infoDate+item.id,
            do_id: infoDate,
            p_id: item.id,
            d_amount: item.qty,
            d_price: item.price,
          });
        currentProducts.forEach(function (eachPro) {
          if (eachPro.p_id == item.id) {
            currentQty = eachPro.p_qty;
            // console.log(currentQty)
          }
        });
        db.collection("products")
          .where("p_id", "==", item.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({
                p_qty: currentQty + item.qty,
              });
            });
          });
      });
      alert("บันทึกการซื้อเรียบร้อย");
      this.reload();
      this.onResetStockCart();
    },
    // Delete product
    deletePro: function (product) {
      this.deleteProId = product.p_id;
    },
    onCancelDelete: function () {
      this.deleteProId = "";
    },
    onDeleteSubmit: function (product_id) {
      db.collection("products")
        .where("p_id", "==", product_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete().then(this.getProducts);
          });
        });
    },
    // Edit detail of the selected product
    edit: function (product) {
      this.editId = product.p_id;
      this.editProduct.name = product.p_name;
      this.editProduct.id = product.p_id;
      this.editProduct.description = product.p_description;
      this.editProduct.qty = product.p_qty;
      this.editProduct.price = product.p_price;
      this.editProduct.inprice = product.p_inprice;
    },
    onCancel: function () {
      this.editId = "";
      this.editProduct.name = "";
      this.editProduct.id = "";
      this.editProduct.description = "";
      this.editProduct.qty = 1;
      this.editProduct.price = 0;
      this.editProduct.inprice = 0;
    },
    onEditSubmit: function (product) {
      var sameName = false;
      var editProTmp = this.editProduct;
      this.products.forEach(function (item) {
        if(item.p_name == editProTmp.name && item.p_id != editProTmp.id) {
          sameName = true;
        }
      })
      if(sameName == true) {
        alert("พบชื่อสินค้าในระบบ");
      } else if(this.editProduct.qty < 0 || this.editProduct.qty > 1000 || this.editProduct.qty%1 != 0) {
        alert("กรุณากรอกจำนวนสินค้าให้ถูกต้อง");
      } else if(this.editProduct.price < 0 || this.editProduct.price > 10000 ||
      (this.editProduct.price%1 > 0 && (this.editProduct.price%1 != 0.25 && this.editProduct.price%1 != 0.5))) {
        alert("กรุณากรอกราคาขายของสินค้าให้ถูกต้อง");
      } else if(this.editProduct.inprice < 0 || this.editProduct.inprice > 10000 ||
      (this.editProduct.inprice%1 > 0 && (this.editProduct.inprice%1 != 0.25 && this.editProduct.inprice%1 != 0.5))) {
        alert("กรุณากรอกราคาซื้อของสินค้าให้ถูกต้อง");
      } else {
        db.collection("products")
          .where("p_id", "==", this.editId)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref
                .set({
                  p_id: this.editId,
                  p_name: this.editProduct.name,
                  p_description: this.editProduct.description,
                  p_qty: this.editProduct.qty,
                  p_price: this.editProduct.price,
                  p_inprice: this.editProduct.inprice,
                })
                .then(this.getProducts);
            });
            this.onCancel();
          })
          .then(this.reload)
      }
    },
    removeProduct: function (key) {
      this.shoppingCart.splice(key, 1);
    },
    removeProStock: function (key) {
      this.stockCart.splice(key, 1);
    },
    calcTotalPrice: function () {
      var total = 0;
      this.shoppingCart.forEach(function (item) {
        total += item.price;
      });
      this.totalPrice = total;
    },
    calcTotalPriceAdd: function () {
      var total = 0;
      this.stockCart.forEach(function (item) {
        total += item.price;
      })
      this.totalPriceAdd = total;
    },
    reload: function () {
      window.location.reload()
    },
  },
  components: {
    NavBar,
    MeatCard,
    ProductFormCard,
    AddFormCard,
    AddProQtyCard,
    SellFormCard,
    ShoppingCart,
  },
};
</script>

<style scoped>
.switch-mode-btn {
    width: 200px;
    margin: 4px 2px;
}

.add-product-btn {
  font-size: 1.25vw;
}

#confirm-sell-btn {
   width: 200px;
    margin: 4px 2px;
}

#confirm-add-btn {
   width: 200px;
    margin: 4px 2px;
}

#meat-cards-container {
  padding: 0px;
}

#title-card {
  font-size: 3vw;
}

#meat-detail-card {
    background: white;
    padding: 15px 25px;
    border: 1px solid #e1e8ed;
    border-radius: 4px;
    margin-bottom: 16px;
}

#add-card-footer {
 margin-top: 20px;
}

#sell-btn {
  width: 100%;
}

#add-btn {
  width: 100%;
  margin-bottom: 3.5px;
}

#edit-btn, #delete-btn{
  width: 49%;
}
</style>

