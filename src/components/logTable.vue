<template>
    <div>
        <div>
        <table class="table table-bordered">
            <tr>
                <th>ID</th>
                <th>Date Time</th>
                <th v-if="oderin != 'Stock_log'">Price</th>
                <th>Detail</th>
            </tr>
            <template v-for="ord in Ord" >
              <tr v-if="ord.date >= DateRange[0] && ord.date <= DateRange[1]" :key="ord.o_id">
                <td> {{ ord.o_id }} </td>
                <td> {{ ord.date }} </td>
                <td  v-if="oderin != 'Stock_log'"> {{ ord.o_total }} </td>
                <td > <button @click="show(ord.o_id)">Detail</button></td>
             </tr>
              </template>
        </table>
        </div>
        <modal name="detail-popup" transition="pop-out" :width="400" :focus-trap="true" :height="400" >
            <template v-for="(det,index) in DeOrd">
            <ul v-if="det.o_id == recp" :key="index">
                <li>{{ det.p_id }}</li>
                <li>{{ det.o_amount }}</li>
                <li  v-if="oderin != 'Stock_log'">{{ det.o_price }}</li>
                <a>___________________</a>
            </ul>
            </template>
            <button @click="hide()">close</button>
        </modal>
    </div>
</template>

<script>
export default {
    data() {
        return{
        DateRange: this.Dainit,
        oderin: this.ODrinit,
        Ord: this.SOinit,
        DeOrd: this.DOinit,
        recp:'',
    }
    },
    methods:{
        show(rec){
            console.log(rec)
            this.recp = rec
            // console.log(rec)
            // console.log(rec)
            this.$modal.show('detail-popup')
        },
        hide(){
            this.recp = []
            this.$modal.hide('detail-popup')
        }
    },
    props:{
        SOinit:{
            type: Array,
            default: []
        },
        DOinit:{
            type: Array,
            default: []
        },
        ODrinit:{
            type: String,
            default: "Order_by_date"
        },
        Dainit:{
            type: Array,
            default: []
        },
    },
}
</script>

<style>
</style>