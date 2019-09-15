<template>
  <b-container>
    <b-card v-for="object in value"
            class="mb-1"
            bg-variant="light">
      <b-form-group
        label-cols-lg="3"
        :label="object.name"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0">
        <b-form-group
          label-cols-sm="3"
          label="Current version:"
          label-align-sm="right"
          :label-for="object.name"
        >
          <b-form-input plaintext class="invalid" :id="object.name" v-model="object.current"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="Required version:"
          label-align-sm="right"
          label-for="nested-city">
          <b-form-input plaintext class="valid" id="nested-city" v-model="object.required"></b-form-input>
        </b-form-group>
      </b-form-group>
    </b-card>
  </b-container>
</template>

<script>
  export default {
    name: "ExtendedRow",
    props: ['value']
  }
</script>

<style scoped>
  .invalid {
    padding-left: 12px;
    border-radius: 4px;
    background-color: #f5c6cb;
  }
  .valid {
    padding-left: 12px;
    border-radius: 4px;
    background-color: #68EF6E;
  }
</style>
