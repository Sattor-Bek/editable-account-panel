<template>
  <div class="snackbar-wrapper">
    <div class="snackbar" :class="openSnackbar">
      <div>{{ text }}</div>
      <button class="close" @click="close"> {{labels.close}} </button>
    </div>
  </div>
</template>
<script>
  import { labels } from '@/utilities/textData.js';
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
    data(){
      return {
        labels: labels
      };
    },
    methods:{
      close: function(){
        this.$emit("close");
      },
      openSnackbar: function(){
        return this.snackbar ? "on" : "off";
      }
    }
  }
</script>