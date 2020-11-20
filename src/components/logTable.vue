<template>
  <div>
    <div class="invent-table-log">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Date Time</th>
            <th v-if="oderin != 'Stock_log'">Price</th>
            <th>Detail</th>
          </tr>
        </thead>
        <template v-for="ord in Ord">
          <tr
            v-if="ord.date >= DateRange[0] && ord.date <= DateRange[1]"
            :key="ord.o_id"
          >
            <td>{{ ord.o_id }}</td>
            <td>{{ ord.date }}</td>
            <td v-if="oderin != 'Stock_log'">{{ ord.o_total }}</td>
            <td style="width: 10%; text-align: center">
              <button class="btn btn-light" @click="show(ord.o_id)">
                Detail
              </button>
            </td>
          </tr>
        </template>
      </table>
    </div>

    <modal
      name="detail-popup"
      transition="pop-out"
      :height="500"
      :focus-trap="true"
    >
      <div class="modal-detail-popup">
        <div class="modal-title" style="color: black; text-align: center">
          DETAIL
        </div>
        <div class="body-part">
          <div class="modal-header"></div>
          <div class="modal-body">
            <template v-for="(det, index) in DeOrd">
              <ul v-if="det.o_id == recp" :key="index">
                <p>
                  <u
                    ><b style="font-weight: bold"> Product ID: </b
                    >{{ det.p_id }}</u
                  >
                </p>
                <p>
                  <b style="font-weight: bold; padding-left: 3em"> Amount: </b
                  >{{ det.o_amount }}
                </p>
                <p v-if="oderin != 'Stock_log'">
                  <b style="font-weight: bold; padding-left: 3em"> Price: </b
                  >{{ det.o_price }}
                </p>
              </ul>
            </template>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="hide()">close</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DateRange: this.Dainit,
      oderin: this.ODrinit,
      Ord: this.SOinit,
      DeOrd: this.DOinit,
      recp: "",
    };
  },
  methods: {
    show(rec) {
      console.log(rec);
      this.recp = rec;
      // console.log(rec)
      // console.log(rec)
      this.$modal.show("detail-popup");
    },
    hide() {
      this.recp = [];
      this.$modal.hide("detail-popup");
    },
  },
  props: {
    SOinit: {
      type: Array,
      default: [],
    },
    DOinit: {
      type: Array,
      default: [],
    },
    ODrinit: {
      type: String,
      default: "Order_by_date",
    },
    Dainit: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style>
.body-part,
.modal-title {
  font-size: 1em;
  letter-spacing: 1px;
  font-weight: 300;
}

.modal-detail-popup {
  position: relative;
  height: 500px;
  padding: 3em;
  overflow-y: scroll;
}

.invent-table-log {
  margin: 10px;
  box-shadow: 0px 2px 8px #888888;
}
th {
  text-align: center;
}
</style>