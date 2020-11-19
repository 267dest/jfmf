<template>
    
</template>

<script>
export default {
    data() {
        return{
        DateRange: Dainit,
        oderin: ODrinit,
        SellOrd: SOinit,
        DeliOrd: DOinit,
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
            default: Order_by_date
        },
        Dainit:{
            type: Array,
            default: []
        }
    },
}
</script>

<style>

</style>