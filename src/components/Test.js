class Test {

  // 组件A
  compa(msg) {
    return {
      data: function () {
        return {
          msg: msg
        }
      },
      template: '<div>{{msg}}</div>'
    }
  }
}

export default Test;


