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
            <name-form v-show="editingName" :user="user" @input="changeName" />
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
            <email-form v-show="editingEmail" :user="user" @input="changeEmail" /> 
            <v-col v-show="!editingEmail" cols="6"><v-card-text>{{user.email}}</v-card-text></v-col>
            <v-col v-show="!editingEmail" cols="2"><v-btn icon @click="openEmailForm"><v-icon small class="fas fa-edit"></v-icon></v-btn></v-col>
          </v-row>
          <v-row align="center" class="grey lighten-5">
            <password-form :user="user" @input="changePassword"/>
          </v-row>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import * as md5 from 'md5';
  import { User } from '@/models/user.js';
  import NameForm from './NameForm.vue';
  import EmailForm from './EmailForm.vue';
  import PasswordForm from './PasswordForm.vue';

  export default {
    name: 'AccountPanel',
    components: {
      NameForm,
      EmailForm,
      PasswordForm,
    },
    created(){
      this.assignDefaultUser()
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
        editingName: false,
        editingEmail: false,
      };
    },
    methods: {
      defaultUser: function(url){
        return new User({
          id:"sampleId",
          firstName:"Satoru",
          lastName:"Nishizawa",
          email:"satoru.nh@gmail.com",
          password:"samplepass",
          avatar: url,
        })
      },
      assignDefaultUser: function(){
        const baseUrl= "http://1.gravatar.com/avatar/" 
        const email = this.defaultUser().email;
        const hash = md5(email);
        const url = baseUrl+hash;
        console.log(url);
        this.user = this.defaultUser(url);
      },
      openNameForm: function(){
        this.editingName = true;
      },
      changeName: function(name){
        this.user.firstName = name.firstName;
        this.user.lastName = name.lastName;
        this.editingName = false;
      },
      openEmailForm: function(){
        this.editingEmail = true;
      },
      changeEmail: function(email){
        this.user.email = email;
        this.editingEmail = false;
      },
      changePassword: function(password){
        this.user.password = password;
      }
    },
  }
</script>