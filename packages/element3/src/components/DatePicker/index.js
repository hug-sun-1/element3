import ElDatePicker from './src/DatePicker.vue'

ElDatePicker.install = function (app) {
  app.component(ElDatePicker.name, ElDatePicker)
}

export { ElDatePicker }
