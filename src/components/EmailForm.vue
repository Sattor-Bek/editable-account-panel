
<template>
    <v-row align="center">
        <v-col cols="9">
            <v-text-field
            v-model="email"
            label="Edit email address">
            </v-text-field>
        </v-col>
        <v-col cols="2">
            <v-btn icon @click="submit">
                <v-icon small class="fas fa-check"></v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
  import { User } from '@/models/user.js';
  export default {
    name: 'EmailForm',
    props:{
        user: {
            type: User
        },
        editingEmail:{
            type: Boolean
        }
    },
    created(){
        this.email = this.user.email;
    },
    data(){
        return {
            email: "",
        }
    },
    methods:{
        submit: function(){
            this.$emit("input", this.email);
      },
    }
  }
</script>
