import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import _ from "lodash"
import Test from './components/Test'
import AppTest from "./components/AppTest";
import CustomEvent from './components/CustomEvent.vue';

new Vue({
  el: '#app',
  render: h => h(App)
})

let vm = new Vue({
  el: '#demo',
  data: {
    first: "这21",
  },
  methods: {
    doSomething: function () {
      console.log(111);
    },
    onSubmit: function () {
      this.$data.first = "这是点击改变的值";
    }
  }
});


// 计算属性
let vmComputed = new Vue({
  el: "#computed",
  data: {
    message: "这是计算属性的字段"
  },
  computed: {
    reverseMessage: function () {
      return this.message.split("").reverse().join("");
    },
    changeMessage: {
      get: function () {
        return this.message + "**";
      },
      set: function (val) {
        this.message = val;
      }
    }
  }
});

// 监听
let vmWatch = new Vue({
  el: "#watch",
  data: {
    question: "",
    answer: "I can't get any question"
  },
  watch: {
    question: function (newQuestion, oldQuestion) {
      this.answer = "wait for you enter...";
      this.timeOutMethod();
    }
  },
  created: function () {
    this.timeOutMethod = _.debounce(this.getAnswer, 500);
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf("？") === -1) { // 如果没有存在问号
        this.answer = "Questions usually contain a question mark.";
        return;
      }

      // 存在问号的情况
      this.answer = "thinking...";
      let vm = this;
      axios.get("https://yesno.wtf/api?" + this.question).then(function (response) {
        vm.answer = _.capitalize(response.data.answer);
      }).catch(function (error) {
        vm.answer = error;
      })
    }
  }
});

// class和style绑定
new Vue({
  el: "#styleBind",
  data: {
    className: { // 用于直接绑定的类名
      active: true,
      default: true
    },
    isOk: { // 用于数据类型绑定的类名，判断使用
      ok: false,
      error: true
    },
    styleObj: { // style内联样式 需要给值加上双引号
      "background-color": "pink",
      "font-size": "20px",
      "color": "green",
      fontWeight: "600",
      backgroundColor: "gray",
      transform: "translate(10px,10px)",
      display: "flex"
    }
  },
  computed: { // 计算属性
    classObject: () => { // 用于直接绑定的类名
      return {
        "active": false,
        "default": true
      }
    },
    okClass: function () { // 用于数组方式绑定的类名
      return {
        ok: this.isOk.ok ? "active" : "",
        error: this.isOk.error ? "error" : ""
      }
    }
  },
  methods: {
    changeClass: function () {
      this.$data.className = {
        "new-active": true,
        "new-default": true
      };
    }
  }
});

// 条件和判断
let vmConditon = new Vue({
  el: "#condition",
  data: {
    isShow: undefined,
    list: [
      {
        name: "lisa",
        sex: "woman"
      },
      {
        name: "bob",
        sex: "man"
      }
    ],
    loginType: "username"
  },
  computed: {
    listFilter: function () {
      return this.list.filter(function (item, index) {
        return item.name != "bob";
      });
    }
  },
  methods: {
    changeTemp: function () { // 用于查看切换模板时，dom渲染机制，用key属性可重新渲染dom，而不是使用已有的dom
      this.loginType == "username" ? this.loginType = "email" : this.loginType = "username";
    },
    listChange: function (list) {
      return list.map(function (item, index) {
        return item.name == "bob" ? "change" : item.name;
      });
    },
    test: function (event) {
      debugger
    },
    enter: function () {
      debugger
    }
  }
});

// 组件的使用
Vue.component("el-test1", {
  data: () => {
    return {
      count: 0
    }
  },
  props: ['item'],
  template: '<div><input v-on:click="count++" type="button" value="点击"> {{item.title + "/" + item.id}} &nbsp;&nbsp;{{count}}' +
    '<button v-on:click="$emit(\'click-emit\',0.1)">click-emit(组件内点击)</button>' +
    '</div>'
});

// 组件上使用v-model
// <input v-bind:value = "msg" v-on:input="msg = $event.target.value"/>
// 等同于 <input v-model= "msg"/>
Vue.component("cpt-model", {
  props: ['value'],
  template: '<div>' +
    '<input v-bind:value = "value" v-on:input="$emit(\'input\',$event.target.value)">' +
    '<slot></slot>' +
    '</div>'
});

let vmcpt = new Vue({
  el: "#cpt",
  components: {
    acomp: {
      template: '<div>这是第一个组件</div>'
    },
    bcomp: {
      template: '<div>这是第二个组件</div>'
    },
    ccomp: {
      template: '<div>这是第三个组件</div>'
    }
  },
  data: {
    list: [
      {
        id: 123, title: "哈哈哈1"
      },
      {
        id: 132, title: "哈哈哈2"
      },
      {
        id: 134, title: "哈哈哈3"
      },
    ],
    pcount: 1,
    modeltext: "组件使用v-model的文字",
    compName: 'acomp',// 用于设置动态组件
  },
  methods: {
    changeStyle: function (bounds) { // 监听组件方法
      this.pcount = this.pcount + bounds;
    },
    changeComp: function (compName) { // 动态组件方法，改变组件的名称，动态渲染
      this.compName = compName;
    }
  }
});

// 引入通用的组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/base',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
);

// 遍历所有的base组件
requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  // 获取和目录深度无关的文件名
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '')

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
});

class person {
  constructor(name, sex) {
    this.name = name;
    this.sex = sex;
  }
}

// 局部组件的使用
new Vue({
  el: '#innerComp',
  data: {
    msg: "test",
    stringData: "测试传递的字符串",
    booleanData: "true",
    numberData: 123,
    arrayData: [1, 2, 3, 4],
    objectData: {id: 1, name: '张三'},
    validateData: 'error',
    personData: new person("对象", "男"),
    person: person,
    checkText: true
  },
  components: {
    "comp-a": Test.prototype.compa("这是组件A的测试参数"),
    "app-test": AppTest
  }
});

/* 异步组件 */
Vue.component('asyn-example',
  (resolve) => require(['./components/base/BaseButton'], resolve)
  // function (resolve, reject) {
//   // setTimeout(function () {
//   //   resolve(BaseButton);
//   // }, 1000);
//   require(['./components/base/BaseButton'], resolve)
// }
);

new Vue({
  el: "#customEvent",
  components: {
    CustomEvent
  },
  data: {
    msg: '1234',
    doc: {
      title: 'doc的title',
      msg: 'doc的msg'
    },
    slotName: [
      {
        name: 'header',
        html: '<p>这里是header插槽</p>'
      },
      {
        name: 'default',
        html: '<p>这里是main插槽</p>'
      },
      {
        name: 'footer',
        html: '<p>这里是footer插槽</p>'
      },
    ]
  },
  methods: {
    showMsg: (msg) => window.alert("显示父组件的监听事件 : " + msg),
    showNative: (msg) => window.alert(msg)
  }
});
