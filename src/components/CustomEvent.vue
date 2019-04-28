<template>
  <div class="outer">
    <button @click.stop="$emit('btn-click',msg)">我是组件的button</button>
    <span>点击外层，可展示组件本身的事件绑定（修饰符.native）</span>
    <input type="text" :value="value" v-on="listenInput">
    <h5>父子组件prop双向绑定</h5>
<!--    <input type="text" v-model="doc" @keyup="$emit('update:doc', $event.target.value)">-->
    <input type="text" v-model="docCopy" @keyup="$emit('update:doc', $event.target.value)">
    <span>{{doc}}</span>
  </div>
</template>

<script>
  export default {
    name: "CustomEvent",
    props: {
      value: String,
      doc: [String, Object]
    },
    computed: {
      listenInput() { // listenInput:function(){}的简写
        let vm = this;
        return Object.assign({}, this.$listeners, {
          input(event) {
            vm.$emit('input', event.target.value);
          }
        })
      }
    },
    data: function () {
      return {
        msg: "123",
        docCopy: this.doc
      }
    }
  }
</script>

<style scoped>
  .outer {
    background-color: palegreen;
    padding: 20px 10px;
  }
</style>
