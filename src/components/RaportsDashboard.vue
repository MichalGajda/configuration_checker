<template>

  <b-card header="List of raports"
          header-bg-variant="info"
          body-bg-variant="light"
          header-text-variant="light">

    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0">
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0">

          <b-input-group size="sm">
            <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
              <template v-slot:first>
                <option value="">-- none --</option>
                <option value="hostname">Hostname</option>
                <option value="issuedAt">Issued at</option>
                <option value="status">Status</option>
              </template>
            </b-form-select>
            <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table striped hover responsive outlined
             class="table-responsive"
             :fields="fields"
             :items="testItems"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :filterIncludedFields="filterOn"
             @row-clicked="goToRaport($event)"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection">
      <template v-slot:cell(hardware.NAME)="data">
        <div v-if="data.item.hardware.NAME">{{data.item.hardware.NAME}}</div>
        <div v-else>N/A</div>
      </template>
      <template v-slot:cell(hardware.LASTDATE)="data">
        <div v-if="data.item.hardware.LASTDATE">{{data.item.hardware.LASTDATE}}</div>
        <div v-else>N/A</div>
      </template>
      <template v-slot:cell(actions)="data">
        <v-icon color="#438de9"
                v-b-tooltip.hover title="Generate raport"
                @click="goToRaport(data.item.id)">picture_as_pdf</v-icon>
      </template>
    </b-table>

    <b-pagination v-if="dataLength > 10"
                  size="md"
                  class="ma-1"
                  :total-rows="testItems.length"
                  v-model="currentPage"
                  :per-page="perPage"
                  @filtered="onFiltered">
    </b-pagination>
  </b-card>
</template>

<script>
  export default {
    name: "RaportsDashboard",
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
      dataLength() {
        return this.testItems.length
      }
    },
    data() {
      return {
        fields: [
          { key: 'hardware.NAME', label: 'Hostname' },
          { key: 'hardware.LASTDATE', label: 'Issued at' },
          // { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions', thStyle: { textAlign: "center"}, tdClass: "text-center" }
        ],
        testItems: [],
        // items: [
        //   { id: 1, hostname: 'test-test1', issuedAt: '14-09-2019 12:24:23', status: 'valid', _rowVariant: 'success' },
        //   { id: 2, hostname: 'test-test2', issuedAt: '14-09-2019 13:24:23', status: 'invalid', _rowVariant: 'danger' },
        //   { id: 3, hostname: 'test-test3', issuedAt: '14-09-2019 14:24:23', status: 'valid', _rowVariant: 'success' },
        //   { id: 4, hostname: 'test-test4', issuedAt: '---', status: 'N/A' },
        //   { id: 5, hostname: 'test-test5', issuedAt: '14-09-2019 16:24:23', status: 'valid', _rowVariant: 'success' },
        // ],
        perPage: 20,
        currentPage: 1,
        // Filter data
        filter: null,
        filterOn: [],
        totalRows: 1,
        // Filter data end
        // Sorting data
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        // Sorting data end
        query_start: 0,
        query_limit: 99
      }
    },
    methods: {
      goToRaport(item) {
        this.$router.push(`/raports/${item.id}`)
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1
      },
      // getIds(array) {
      //   let ids = [];
      //   for(let item of array) {
      //     ids.push(item.ID)
      //   }
      //   return ids
      // },
      // getData() {
      //   this.axios.get('http://192.168.208.3/ocsapi/v1/computers/listID')
      //     .then( resp => {
      //       let data = JSON.parse(resp.data);
      //       console.log('resp', data);
      //       this.computer_ids = this.getIds(data)
      //     })
      //     .catch( err => {
      //       console.log('error')
      //     })
      // },
      getData() {
        this.axios.get(`http://192.168.56.101/ocsapi/v1/computers?start=${this.query_start}&limit=${this.query_limit}`)
          .then( resp => {
            let data = Object.values(JSON.parse(resp.data));
            this.testItems = data;
            this.totalRows = this.testItems.length
          })
          .catch( err => {
          })
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style scoped>
  .card {
    width: 80vw;
    margin: 1.5rem auto;
    text-align: left;
  }
  .alignCenter {
    text-align: center;
  }
</style>
