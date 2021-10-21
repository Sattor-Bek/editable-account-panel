<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="600">
        <v-col>
          <v-row class="grey lighten-5">
            <v-card-title>{{labels.cardTitle}}</v-card-title>
          </v-row>
          <v-row>
            <v-col>
              <v-avatar
                class="profile rounded-circle"
                color="grey"
                size="120"
                justify="center"
                tile
              >
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <v-row align="center" class="grey lighten-5">
            <v-col cols="4"><v-card-text>{{labels.name}}</v-card-text></v-col>
            <name-form v-show="editingName" :user="user" @input="changeName" @cencel="cancelName"/>
            <v-col v-show="!editingName" cols="6" >
                <v-card-text>{{user.firstName}} {{user.lastName}}</v-card-text>
                </v-col>
              <v-col v-show="!editingName" cols="2">
                <v-btn icon @click="openNameForm">
                  <v-icon small class="fas fa-edit">
                  </v-icon>
                </v-btn>
              </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="4"><v-card-text>{{labels.email}}</v-card-text></v-col>
            <email-form v-show="editingEmail" :user="user" @input="changeEmail" @cancel="cancelEmail" /> 
            <v-col v-show="!editingEmail" cols="6"><v-card-text>{{user.email}}</v-card-text></v-col>
            <v-col v-show="!editingEmail" cols="2"><v-btn icon @click="openEmailForm"><v-icon small class="fas fa-edit"></v-icon></v-btn></v-col>
          </v-row>
          <v-row align="center" class="grey lighten-5">
            <password-form :user="user" @input="changePassword"/>
          </v-row>
        </v-col>
      </v-card>
    </v-row>
    <snackbar-message :text="message" :snackbar="snackbar" @close="snackbar = false"/>
  </v-container>
</template>

<script>
  import { User } from '@/models/user.js';
  import { assignDefaultUser } from '@/utilities/sampleUser.js';
  import NameForm from '@/components/NameForm.vue';
  import EmailForm from '@/components/EmailForm.vue';
  import PasswordForm from '@/components/PasswordForm.vue';
  import SnackbarMessage from '@/components/SnackbarMessage.vue';

  export default {
    name: 'AccountPanel',
    components: {
      NameForm,
      EmailForm,
      PasswordForm,
      SnackbarMessage,
    },
    created(){
      this.user = assignDefaultUser();
    },
    data(){
      return {
        user: User,
        labels:{
          cardTitle:"User Profile",
          name:"User Name",
          email:"Email Address",
          password: "Passowrd"
        },
        message:"",
        snackbar: false,
        editingName: false,
        editingEmail: false,
      };
    },
    methods: {
      openNameForm: function(){
        this.editingName = true;
      },
      changeName: function(name){
        const uf = this.user.firstName;
        const ul = this.user.lastName;
        const nf = name.firstName;
        const nl = name.lastName;
        this.editingName = false;
        if(uf == nf && ul == nl){
          return
        } else {
          this.user.firstName = nf;
          this.user.lastName = nl;
          let message = "Successfully changed the " + this.changedNameis(uf,ul,nf,nl);
          this.openSnackbar(message)
        }
      },
      openEmailForm: function(){
        this.editingEmail = true;
      },
      changeEmail: function(email){
        this.editingEmail = false;
        if(this.user.email != email){
            this.user.email = email;
            this.openSnackbar("Successfully changed Email address");
        }
      },
      changePassword: function(password){
        console.log(password, this.user.password)
        if(this.user.password != password){
          this.user.password = password;
          this.openSnackbar("Successfully changed the password"); 
        }
      },
      cancelName: function(){
        this.editingName = false;
      },
      cancelEmail: function(){
        this.editingEmail = false;
      },
      openSnackbar: function(message){
          this.message = message;
          this.snackbar = true;
      },
      changedNameis: function(uf, ul, nf, nl){
        if(uf != nf && ul != nl){
          return "first name and last name";
        } else if (uf != nf && ul == nl){
          return "first name";
        } else if (uf == nf && ul != nl){
          return "last name"
        }
      },
    },
  }
</script>