<template>

  <div>
    <b-table striped hover responsive outlined
             class="table-responsive"
             :fields="fields"
             :items="items"
             :current-page="currentPage"
             :per-page="perPage">
      <template v-slot:cell(actions)="data">
        <div @click="goToRaport(data.item.id)">edit</div>
        <!--<v-icon color="#28a745"-->
                <!--v-b-tooltip.hover title="Manage organization"-->
                <!--@click="goToRaport(row.index)">edit</v-icon>-->
      </template>
    </b-table>

    <b-pagination v-if="dataLength > 10"
                  size="md"
                  class="ma-1"
                  :total-rows="items.length"
                  v-model="currentPage"
                  :per-page="perPage">
    </b-pagination>
  </div>
</template>

<script>
  export default {
    name: "RaportsDashboard",
    computed: {
      dataLength() {
        return this.items.length
      }
    },
    data() {
      return {
        fields: [
          { key: 'hostname', label: 'Hostname' },
          { key: 'issuedAt', label: 'Issued at' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions' }
        ],
        items: [
          { id: 1, hostname: 'test-test1', issuedAt: '14-09-2019 12:24:23', status: 'valid', _rowVariant: 'success' },
          { id: 2, hostname: 'test-test2', issuedAt: '14-09-2019 13:24:23', status: 'invalid', _rowVariant: 'danger' },
          { id: 3, hostname: 'test-test3', issuedAt: '14-09-2019 14:24:23', status: 'valid', _rowVariant: 'success' },
          { id: 4, hostname: 'test-test4', issuedAt: '---', status: 'N/A' },
          { id: 5, hostname: 'test-test5', issuedAt: '14-09-2019 16:24:23', status: 'valid', _rowVariant: 'success' },
        ],
        perPage: 20,
        currentPage: 1,
      }
    },
    methods: {
      goToRaport(id) {
        this.$router.push(`/raports/${id}`)
      }
    }
  }
</script>

<style scoped>

</style>
