<template>
  <div class="container">
    <header class="header">
      <slot name="header" :user="user"></slot>
    </header>
    <main class="main">
      <slot></slot><!--默认name=default-->
    </main>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "BaseLayout",
    data() {
      return {
        user: {
          firstname: 'Bob',
          lastname: 'Li'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    width: 80%;
    margin: auto;
    padding: 10px;
    background-color: #efefef;
  }

  .header {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }

  .footer {
    background-color: #ddd;
    text-align: center;
    padding: 10px;
    margin-top: 10px;
  }
</style>
