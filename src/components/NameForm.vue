
<template>
      <v-row align="center" >
        <v-col cols="9">
            <v-text-field
                v-model="name.firstName"
                label="Edit first name">
            </v-text-field>
            <v-text-field
                v-model="name.lastName"
                label="Edit last name">
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
    name: 'NameForm',
    props:{
        user: {
            type: User
        },
        editingName:{
            type: Boolean
        }
    },
    created(){
        this.name.firstName = this.user.firstName;
        this.name.lastName = this.user.lastName;
    },
    data(){
        return {
            name: {
                firstName: "",
                lastName: "",
            },
        }
    },
    methods:{
        submit: function(){
            this.$emit("input", this.name);
      },
    }
  }
</script>
