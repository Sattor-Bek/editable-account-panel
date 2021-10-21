
<template>
    <v-row align="center">
        <v-col cols="9">
            <v-form ref="emailForm">
                <v-text-field
                @keypress.enter="submit"
                v-model="email"
                :rules="emailRules"
                required
                label="Edit email address">
                </v-text-field>
            </v-form>
        </v-col>
        <v-col cols="3">
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
import { emailRules } from '@/utilities/validation.js';
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
            emailRules: emailRules,
        }
    },
    methods:{
        submit: function(){
            if(this.$refs.emailForm.validate()){
                this.$emit("input", this.email);
            }
      },
        cancel: function(){
          this.$emit("cancel");
      }
    }
  }
</script>
