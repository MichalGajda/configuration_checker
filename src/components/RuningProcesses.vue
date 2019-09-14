<template>
  <b-table striped hover responsive outlined
           class="table-responsive"
           :fields="fields"
           :items="items"
           :current-page="currentPage"
           :per-page="perPage">
    <template v-slot:cell(cpuUsage)="data">
      {{data.item.cpuUsage}}%
    </template>
    <template v-slot:cell(memUsage)="data">
      {{data.item.memUsage}}%
    </template>
    <template v-slot:cell(discUsage)="data">
      {{data.item.discUsage}}%
    </template>
  </b-table>
</template>

<script>
  export default {
    name: "RuningProcesses",
    data() {
      return {
        fields: [
          { key: 'proc_name', label: 'Process name' },
          { key: 'cpu_usage', label: 'CPU usage' },
          { key: 'mem_usage', label: 'Memory usage' },
          { key: 'disc_usage', label: 'Disc usage' }
        ],
        items: [
          { procName: 'redis-cli', cpuUsage: '13', memUsage: '34', discUsage: '2', }
        ],
        perPage: 20,
        currentPage: 1
      }
    }
  }
</script>

<style scoped>

</style>
