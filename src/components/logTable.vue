<template>
    <div>
        <div>
        <table class="table table-bordered">
            <tr>
                <th>ID</th>
                <th>Date Time</th>
                <th>Price</th>
                <th>Detail</th>
            </tr>
            <template v-for="ord in SellOrd" >
              <tr v-if="ord[0].date >= DateRange[0] && ord[0].date <= DateRange[1]" :key="ord[0].o_id">
                <td> {{ ord[0].o_id }} </td>
                <td> {{ ord[0].date }} </td>
                <td> {{ ord[0].o_total }} </td>
                <td > <button @click="show(ord[1])">Detail</button></td>
             </tr>
              </template>
        </table>
        </div>
        <modal name="detail-popup" transition="pop-out" :width="400" :focus-trap="true" :height="400">
            <ul v-for="(dets,index) in recp" :key="index">
                <li>{{ dets.p_id }}</li>
                <li>{{ dets.o_amount }}</li>
            </ul>
        </modal>
    </div>
</template>

<script>
export default {
    data() {
        return{
        DateRange: this.Dainit,
        oderin: this.ODrinit,
        SellOrd: this.SOinit,
        DeliOrd: this.DOinit,
        recp:[]
    }
    },
    methods:{
        show(rec){
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