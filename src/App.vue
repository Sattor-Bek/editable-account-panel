<template>
  <div id="app">
    <account-panel/>
  </div>
</template>

<script>
import AccountPanel from './components/AccountPanel.vue'

export default {
  name: 'App',
  components: {
    AccountPanel
  },
}
</script>

<style>
#app {
  font-family: "Open Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #fffffff5;
}
</style>
