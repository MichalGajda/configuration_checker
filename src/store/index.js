import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    requirements: {},
    check_status: {}
  },
  mutations: {
    setRequirements(state, requirements) {
      state.requirements = requirements;
    }
  },
  actions: {
    checkSystem({state, dispatch}) {
      var check_status = {};
      axios.get('http://192.168.208.3/ocsapi/v1/computers?start=0&limit=99')
        .then(resp => {
          // let requirements = state.requirements;
          dispatch("prepareData", Object.values(JSON.parse(resp.data)))
            .then(data => {
              for (let req in state.requirements) {
                for (let host in data) {
                  let validate = true;
                  let different = [];
                  let current_value;
                  let required_value;

                  for (let prop in state.requirements[req]) {
                    if (!!prop) {
                      let value = data[host][req][prop.toUpperCase()];
                      if (!!value) {
                        if (typeof value !== 'object') {
                          // normal check
                          current_value = value.toLowerCase();
                          value = state.requirements[req][prop];
                          if (!!value) {
                            required_value = value.toLowerCase();
                          } else {
                            continue;
                          }

                          if (current_value !== required_value) {
                            validate = false;
                            different.push({
                              "name": prop,
                              "required": required_value,
                              "current": current_value
                            });
                          }
                        } else {
                          // group check (!logic)
                          let installed = false;
                          for (let _prop of data[host][req]) {
                            // check if installed
                            let check = true;
                            for (let key of Object.keys(state.requirements[req][prop])) {
                              if (state.requirements[req][prop][key] !== _prop[key.toUpperCase()]) {
                                check = false;
                              }
                            }
                            if (check) {
                              installed = true;
                            }
                          }

                          // if not installed if not add to differences
                          if (!installed) {
                            validate = false;
                            different.push({
                              "name": req,
                              "required": state.requirements[req][prop].name,
                              "current": "Not installed"
                            });
                          }
                        }
                      }
                    }
                  }
                  if (!Object.keys(check_status).includes(host)) {
                    check_status[host] = {
                      "validate": validate,
                      "different": different
                    };
                  } else {
                    let _different = check_status[host].different;
                    let cont_different = different.concat(_different);
                    check_status[host] = {
                      "validate": validate,
                      "different": cont_different
                    };
                  }
                  state.check_status = check_status;
                }
              }
              console.log(state.check_status);
            });
        })
        .catch(err => {
        });
    },
    prepareData({state}, data) {
      let keys = Object.keys(state.requirements);
      let _data = {};
      data.forEach(arr => {
        let properties = {};
        Object.entries(arr).filter((entries) => {
          return keys.includes(entries[0]);
        }).map(arr => {
            properties[arr[0]] = arr[1];
            return properties;
          }
        );
        _data[arr.hardware.NAME] = properties;
      });
      return _data;
    }
  },
  getters: {
    requirements(state) {
      return state.requirements;
    }
  }
});
