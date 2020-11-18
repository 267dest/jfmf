<template>
  <div>
      <b-button v-b-modal.modal-prevent-closing>{{ title }}</b-button>
      <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Edit Product"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      >
       <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="ID"
          label-for="id-input"
          invalid-feedback="ID is required"
        >
            <b-form-input
                id="id-input"
                v-model="id"
                required
            ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
            <b-form-input
                id="name-input"
                v-model="name"
                required
            ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="description-input"
          invalid-feedback="Description is required"
        >
            <b-form-input
                id="description-input"
                v-model="description"
                required
            ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Quantity"
          label-for="qty-input"
          invalid-feedback="Quantity is required"
        >
            <b-form-input
                id="qty-input"
                v-model="qty"
                required
            ></b-form-input>
        </b-form-group>

       </form>
      </b-modal>
  </div>
</template>

<script>
export default {
    props: ["title"],
    data() {
        return {
            id: '',
            name: '',
            description: '',
            qty: 0
        }
    },
    methods: {
        resetModal() {
            this.id = ''
            this.name = ''
            this.description = ''
            this.qty = 0
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
       handleSubmit() {

            // Hide the modal manually
            this.$nextTick(() => {
              this.$bvModal.hide('modal-prevent-closing')
            })
        }
    }
};
</script>

<style>
</style>