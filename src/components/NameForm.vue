
<template>
    <v-row align="center" >
        <v-col cols="8">
            <v-form ref="nameForm">
                <v-text-field
                    @keypress.enter="submit"
                    v-model="name.firstName"
                    required
                    :rules="firstNameRules"
                    label="Edit first name">
                </v-text-field>
                <v-text-field
                    @keypress.enter="submit"
                    v-model="name.lastName"
                    required
                    :rules="lastNameRules"
                    label="Edit last name">
                </v-text-field>
            </v-form>
        </v-col>
        <v-col cols="4">
            <v-btn icon @click="submit">
                <v-icon small class="fas fa-check-circle"></v-icon>
            </v-btn>
            <v-btn icon @click="cancel">
                <v-icon small class="fas fa-window-close"></v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
  import { User } from '@/models/user.js';
  import { firstNameRules, lastNameRules } from '@/utilities/validation.js';
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
            firstNameRules: firstNameRules,
            lastNameRules: lastNameRules
        }
    },
    methods:{
        submit: function(){
            if(this.$refs.nameForm.validate()){
                this.$emit("input", this.name);
            }
          },
        cancel: function(){
          this.$emit("cancel");
          },
    }
  }
</script>
