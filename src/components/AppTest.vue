<template>
  <div>
    <h5>子组件的数据</h5>
    <div>字符串数据：{{data1}}
      <input type="text" v-model="data1">
    </div>
    <div>布尔数据：{{booleanData}}
      <input type="text" v-model="booleanData">
    </div>
    <div>数字数据：{{numberData}} <input type="text" v-model="numberData"></div>
    <div>数组数据：{{arrayData}} <input type="button" @click="addItem" value="增加一个元素"></div>
    <div>计算属性数组数据：{{arrayData1.toString()}} <input type="button" @click="addItem1" value="增加一个元素"></div>
    <div>对象数据：{{objectData}}</div>
    <div>自定义方法验证：{{validateData}}</div>
  </div>
</template>

<script>
  export default {
    name: "AppTest",
    props: { // 参数
      stringData: {
        type: String,
        default: "string默认值",
      },
      booleanData: {
        type: Boolean,
        default: false
      },
      numberData: {
        type: [Number, String], // 多个类型
        default: 123
      },
      arrayData: { // 数组和对象的默认数据，必须是一个function定义
        type: Array,
        default: () => ["默认"]
      },
      objectData: {
        type: Object,
        default: () => {
          return {
            id: 123, name: "默认"
          }
        }
      },
      validateData: { // 自定义验证，值必须是下列三个中的其中一个
        default: "success",
        required: true,
        validator: function (value) {
          return ["success", "danger", "error"].indexOf(value) != -1;
        }
      }
    },
    data: function () {
      return {
        data1: this.stringData + "123",
        arrayData1: [].concat(this.arrayData), // 使用此方法，可以避免修改到原数据
      }
    },
    computed: { // 计算属性

    },
    methods: {
      addItem: function () {
        // 增加一个数组，会改到父组件的数据，对象是同理的
        this.arrayData.push(this.arrayData[this.arrayData.length - 1] + 1);
      },
      addItem1: function () {
        // 增加一个数组，不会改到父组件
        this.arrayData1.push(this.arrayData1[this.arrayData1.length - 1] + 1); // 增加一个数组
      }
    }
  }
</script>

<style scoped>

</style>
