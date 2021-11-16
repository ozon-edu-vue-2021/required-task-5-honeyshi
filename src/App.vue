<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("getProducts");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

.ant-card-meta-description {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ant-page-header-heading {
  padding-top: 10px;
  padding-right: 10px;
}
</style>
