export default {
  props:{
    value:String // 参数类型提示
  },
  template: '<div>' +
    '<input :value = "value" @input="$emit(\'input\',$event.target.value)">'+
    '<slot></slot>'+
    '</div>'
}
