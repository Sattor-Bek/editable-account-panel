
<template>
    <v-row align="center" class="pa-5" >
        <v-dialog v-model="editingPassword" max-width="600">
            <template v-slot:activator="{on}">
                <v-col cols="4"><v-btn class="grey" v-on="on">Change Password</v-btn></v-col>
            </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">You are changing password</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="oldPassword" label="Input your old password"></v-text-field>
                            <v-text-field v-model="newPassword" label="Input your new password"></v-text-field>
                        </v-form>
                        <v-btn @click="submit">Confirm</v-btn>
                    </v-card-text>
                </v-card>
        </v-dialog>
        <snackbar-message :text="message" :snackbar="snackbar" @close="snackbar = false"/>
    </v-row>
</template>
<script>
  import { User } from '@/models/user.js';
  import SnackbarMessage from './SnackbarMessage.vue';
  export default {
    name: 'PasswordForm',
    components: {
        SnackbarMessage,
    },
    props:{
        user: {
            type: User
        },
    },
    data() {
        return {
            oldPassword: "",
            newPassword: "",
            message: "",
            editingPassword: false,
            snackbar: false,
        }
    },
    methods:{
        submit: function(){
            if(this.validatePassword()){
                this.$emit("input", this.newPassword);
                this.editingPassword = false;
            }
      },
        validatePassword: function(){
            let text = "";
            if(this.oldPassword.length > 0 && this.oldPassword === this.user.password){
                text = "Success"
                this.openSnackbar(text);
                return true
            } else {
                text = "Old password is not valid"
            }
            if(!this.newPassword){
                text = "Please input new password"; 
            }
            this.openSnackbar(text);
            return false
      },
      openSnackbar: function(message){
          this.message = message;
          this.snackbar = true;
      },
      passwordSafeMater: function(){
        //use meter   https://github.com/dropbox/zxcvbn
      }
    }
  }
</script>
