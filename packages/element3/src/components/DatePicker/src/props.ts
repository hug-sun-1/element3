export const props = {
  selectableRange: {
    type: Array,
    default: []
  },
  modelValue: String,
  showSeconds: Boolean,
  arrowControl: Boolean,
  amPmMode: {
    type: String,
    default: '' // 'a': am/pm; 'A': AM/PM
  }
}
