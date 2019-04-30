Vue.component('asyn-example', function (resolve, reject) {
  setTimeout(function () {
    resolve({
      template:'<div>I am async</div>'
    });
  }, 1000);
});
