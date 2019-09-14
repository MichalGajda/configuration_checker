<template>
  <b-card header="Raport"
          header-bg-variant="info"
          body-bg-variant="light"
          header-text-variant="light">

    <b-container fluid>

      <b-row class="my-1">
        <b-col sm="5">
          <label class="text-md-left" for="os_version">Os version:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input id="os_version"
                        type="text"
                        v-model="raport.os.version"
                        disabled></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="5">
          <label for="software_version">Latest software version:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input id="software_version"
                        type="text"
                        v-model="raport.software.version"
                        disabled></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="5">
          <label for="antivirus_version">Antivirus version:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input id="antivirus_version"
                        type="text"
                        v-model="raport.antivirus.version"
                        disabled></b-form-input>
        </b-col>
      </b-row>

    </b-container>

    <hr>
    <RunningProcesses v-if="displayProcesses"></RunningProcesses>

    <hr>
    <InstalledApps v-if="displayApps"></InstalledApps>

  </b-card>
</template>

<script>
  import RunningProcesses from '@/components/RuningProcesses'
  import InstalledApps from "@/components/InstalledApps";
  export default {
    name: "Raport",
    props: ['value'],
    components: {InstalledApps, RunningProcesses },
    data() {
      return {
        raport: {
          os: { version: '1.13'},
          software: { version: '13.1'},
          antivirus: { version: '0.72c'}
        },
        displayApps: true,
        displayProcesses: true,
        options: [
          {
            "text": "Enabled",
            "value": true,
            "buttonVariant": "outline-info"
          },
          {
            "text": "Disabled",
            "value": false,
            "buttonVariant": "outline-info"
          }
        ]
      }
    },
    methods: {
      toggleValue(val) {
        val = !val
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
</style>
