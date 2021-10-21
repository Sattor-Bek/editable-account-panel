<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>
    <v-main>
      <AccountPanel/>
    </v-main>
  </v-app>
</template>

<script>
import AccountPanel from './components/AccountPanel';

export default {
  name: 'App',

  components: {
    AccountPanel,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  font-family: 'Open Sans';
}
</style>