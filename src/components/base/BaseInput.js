/**
 * input控件绑定
 * 使用方法：<base-input v-model="msg" :label="'文本框：'" type="text"></base-input>
 * @param label 标签名称
 * @param value 对应input的value，可以使用v-model
 */

export default {
  name:"base-input",
  inheritAttrs: false, // 不继承父组件的属性
  props: ["label", "value"],
  computed: {
    // input v-model监听
    // v-model='msg' 等价于  :value='msg' @input='$emit("input",$event.target.value)'
    inputValue() { // 等价于inputValue:function(){}
      let vm = this;
      return Object.assign({}, this.$listeners, {
        input(event) {
          vm.$emit('input', event.target.value);
        }
      })
    }
  },
  template: `<div> 
    <label>{{label}}</label>
    <input v-bind="$attrs" :value = "value" v-on="inputValue">
    <slot></slot>
    </div>`
}
