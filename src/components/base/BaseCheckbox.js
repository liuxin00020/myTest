export default {
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: Boolean,
    value: String,
    label: String
  },
  computed: {
    checkedValue() {
      let vm = this;
      return Object.assign({}, this.$listeners, {
        change(event) {
          vm.$emit('change', event.target.checked);
        }
      })
    }
  },
  template: `<div>
              <input type="checkbox" v-bind="$attrs" v-on="checkedValue" :checked="checked"/>
              <label>{{label}}</label>
            </div>`
}
