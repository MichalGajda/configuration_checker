<template>
  <div class="container top-5-margin">
    <div class="row">
      <div class="col-md-10 offset-1">
        <b-form class="justify-content-center" @submit.prevent="onSubmit">
          <b-form-group id="input-group-1"
                        label="Os name:"
                        label-for="input-1"
                        label-cols="2">
            <b-form-input id="input-1"
                          v-model="requirements.hardware.osname"
                          type="text"
                          required
                          placeholder="Enter operation system name">
            </b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2"
                        label="Os version:"
                        label-cols="2"
                        label-for="input-2">
            <b-form-input id="input-2"
                          type="number"
                          v-model="requirements.hardware.osversion"
                          required
                          placeholder="Enter operation system version">
            </b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3"
                        label="Arch:"
                        label-cols="2"
                        label-for="input-3">
            <b-form-select id="input-3"
                           v-model="requirements.hardware.arch"
                           :options="archTypes"
                           required>
            </b-form-select>
          </b-form-group>

          <b-form-group>
            <b-button variant="success" size="sm" @click="showSoftware = !showSoftware">
              Add software
            </b-button>
            <b-table v-if="showSoftware"
                     class="top-2-margin"
                     :items="requirements.software"
                     :fields="softwareFields"
                     striped
                     responsive="sm">
              <template v-slot:cell(name)="data">
                <b-input placeholder="Enter name of the software"
                         v-model="data.item.name">
                </b-input>
              </template>
              <template v-slot:cell(version)="data">
                <b-input placeholder="Enter version of the software"
                         type="number"
                         v-model="data.item.version">
                </b-input>
              </template>
              <template v-slot:cell(action)="data">
                <v-icon class="remove-icon" @click="removeItem(requirements.software, data.index)">
                  remove_circle_outline
                </v-icon>
              </template>
              <template slot="table-caption">
                <v-icon class="add-icon" @click="newItem(requirements.software, {name: '', version: ''})">
                  add_circle_outline
                </v-icon>
              </template>
            </b-table>
          </b-form-group>

          <b-form-group>
            <b-button variant="success" size="sm" @click="showRunningProcess = !showRunningProcess">
              Add Running Process
            </b-button>
            <b-table v-if="showRunningProcess"
                     class="top-2-margin"
                     :items="requirements.runningprocess"
                     :fields="runningProcessFields"
                     striped
                     responsive="sm">
              <template v-slot:cell(processname)="data">
                <b-input placeholder="Process name"
                         v-model="data.item.processname">
                </b-input>
              </template>
              <template v-slot:cell(commandline)="data">
                <b-input placeholder="Command"
                         type="number"
                         v-model="data.item.commandline">
                </b-input>
              </template>
              <template v-slot:cell(username)="data">
                <b-input placeholder="User name"
                         type="number"
                         v-model="data.item.username">
                </b-input>
              </template>
              <template v-slot:cell(action)="data">
                <v-icon class="remove-icon" @click="removeItem(requirements.runningprocess, data.index)">
                  remove_circle_outline
                </v-icon>
              </template>
              <template slot="table-caption">
                <v-icon class="add-icon" @click="newItem(requirements.runningprocess, { processname: '',
                                                                                        commandline: '',
                                                                                        username: '',
                                                                                        processmemory: '' })">
                  add_circle_outline
                </v-icon>
              </template>
            </b-table>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ requirements }}</pre>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Requirements",
        data() {
            return {
                archTypes: ["x86", "x86 64 bit"],
                showSoftware: false,
                showRunningProcess: false,
                softwareFields: [{key: "name"}, {key: "version"}, {key: "action"}],
                runningProcessFields: [{key: "processname"},{key: "commandline"},{key: "username"},{key: "action"}],
                requirements: {
                    hardware: {
                        osname: '',
                        osversion: '',
                        arch: ''
                    },
                    software: [],
                    runningprocess: []
                },
            }
        },
        methods: {
            onSubmit() {
                this.$store.commit("setRequirements", this.requirements);
            },
            newItem(list, newItem) {
                list.push(newItem)
            },
            removeItem(list, index) {
                list.splice(index, 1);
            }
        }
    }
</script>

<style scoped>

  .top-2-margin {
    margin-top: 2vh;
  }

  .top-5-margin {
    margin-top: 5vh;
  }

  .add-icon {
    color: #42b983;
    float: right;
  }

  .remove-icon {
    color: red;
  }
</style>
