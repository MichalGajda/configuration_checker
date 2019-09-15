<template>

  <b-card header="Raport details"
          header-bg-variant="info"
          body-bg-variant="light"
          header-text-variant="light">

    <b-list-group>
      <b-container>
        <div v-if="raportObject.hasOwnProperty('different')">
          <ExtendedRow v-model="raportObject.different"></ExtendedRow>
        </div>
        <div v-else>
          Raport currently not available for host <b>{{this.$route.params.name}}</b>
        </div>
      </b-container>

    </b-list-group>

  </b-card>

</template>

<script>
  import ExtendedRow from '@/components/ExtendedRow'
  export default {
    name: "TestRaport",
    components: { ExtendedRow },
    data() {
      return {
        raportObject: {}
      }
    },
    mounted() {
      this.raportObject = this.$store.getters.check_status[this.$route.params.name]
    }
  }
</script>

<style scoped>
  .card {
    width: 80vw;
    margin: 1.5rem auto;
    text-align: left;
  }
  .form-control:invalid {
    background-color: #eb6792;
  }
</style>
