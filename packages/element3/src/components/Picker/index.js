import Picker from './src/Picker.vue'

Picker.install = function (app) {
  app.component(Picker.name, Picker)
}

export { Picker }
