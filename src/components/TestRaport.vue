<template>

  <b-card header="Raport details"
          header-bg-variant="info"
          body-bg-variant="light"
          header-text-variant="light">

    <b-list-group>
      <div v-if="raportObject.hardware.length > 0">
        <div v-if="!showHardware">
          <b-list-group-item @click="toggleHardware" class="d-flex justify-content-between align-items-center">
            Show hardware differences
            <b-badge variant="primary" pill>{{raportObject.hardware.length}}</b-badge>
          </b-list-group-item>
        </div>
        <div v-else>
          <b-list-group-item @click="toggleHardware" class="d-flex justify-content-between align-items-center">
            Hide hardware differences
            <b-badge variant="primary" pill>{{raportObject.hardware.length}}</b-badge>
          </b-list-group-item>
          <b-container v-if="showHardware">
            <!--<h4><b>Hardware differences:</b></h4>-->
            <ExtendedRow v-model="raportObject.hardware"></ExtendedRow>
          </b-container>
        </div>
      </div>

      <div v-if="raportObject.softwares.length > 0">
        <div v-if="!showSoftware">
          <b-list-group-item @click="toggleSoftware" class="d-flex justify-content-between align-items-center">
            Show missing software
            <b-badge variant="primary" pill>{{raportObject.softwares.missingSoftware.length}}</b-badge>
          </b-list-group-item>
        </div>
        <div v-else>List to be here</div>
      </div>

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
        showHardware: true,
        showSoftware: true,
        raportObject: {
          hostname: 'cokolwiek',
          hardware: [{
            name: 'costam',
            current: '1.11',
            required: '1.13'
          },
          {
            name: 'costam2',
            current: '2.13',
            required: '1.14'
          }],
          softwares: {
            missingSoftware: [
              'Apka1',
              'Apka2',
              'Apka3',
              'Apka4',
            ]
          }
        }
      }
    },
    methods: {
      toggleHardware() {
        this.showHardware = !this.showHardware
      },
      toggleSoftware() {
        this.showSoftware = !this.showSoftware
      }
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
