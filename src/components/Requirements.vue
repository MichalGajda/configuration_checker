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
                          type="text"
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
                     :items="requirements.softwares"
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
                         type="text"
                         v-model="data.item.version">
                </b-input>
              </template>
              <template v-slot:cell(action)="data">
                <v-icon class="remove-icon" @click="removeItem(requirements.softwares, data.index)">
                  remove_circle_outline
                </v-icon>
              </template>
              <template slot="table-caption">
                <v-icon class="add-icon" @click="newItem(requirements.softwares, {name: '', version: ''})">
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
                         type="text"
                         v-model="data.item.commandline">
                </b-input>
              </template>
              <template v-slot:cell(username)="data">
                <b-input placeholder="User name"
                         type="text"
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

          <b-button type="submit" variant="primary">Check system</b-button>
          <div v-if="startAnalyzing">
            </br>
            <b-spinner type="grow"></b-spinner>
            </br>
            <label>Analyzing</label>
          </div>
        </b-form>
        <b-card class="mt-3" header="Config preview">
          <pre class="m-0">{{ requirements }}</pre>
        </b-card>
        <input type="file" id="file" ref="file" @change="loadConf()"/>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Requirements",
        data() {
            return {
                startAnalyzing: false,
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
                    softwares: [],
                    runningprocess: []
                },
            }
        },
        methods: {
            loadConf() {
                if (!!this.$refs.file) {
                    if (!!this.$refs.file.files[0]) {
                        let file = this.$refs.file.files[0];
                        let reader = new FileReader();
                        reader.addEventListener('load', this.setConf);
                        reader.readAsText(file);
                    }
                }
            },
            setConf(event) {
                this.requirements = JSON.parse(event.target.result);
            },
            onSubmit() {
                this.$store.commit("setRequirements", this.requirements);
                this.startAnalyzing = true;
                this.$store.dispatch('checkSystem');
                setTimeout(()=> {
                    this.startAnalyzing = false;
                }, 500)
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
