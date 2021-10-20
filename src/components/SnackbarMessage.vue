<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="close"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    name: "SnackbarMessage",
    props:{
        text: {
          type: String
        },
        snackbar:{
          type: Boolean,
          default: false,
        },
    },
    methods:{
      close: function(){
        this.$emit("close");
      }
    }
  }
</script>