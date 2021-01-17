import ElTimePicker from './src/TimePicker.vue'

ElTimePicker.install = function (Vue) {
  Vue.component(ElTimePicker.name, ElTimePicker)
}

export { ElTimePicker }
