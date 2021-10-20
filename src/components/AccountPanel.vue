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
                <v-img src="http://1.gravatar.com/avatar/19357cef196a8ad90bf4c1b6125137b1"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <v-row align="center" class="grey lighten-5">
            <v-col cols="4"><v-card-text>{{labels.name}}</v-card-text></v-col>
            <v-col cols="6"><v-card-text>{{user.firstName}} {{user.lastName}}</v-card-text></v-col>
            <v-col cols="2">
              <v-btn icon>
                <v-icon small class="fas fa-edit">
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="4"><v-card-text>{{labels.email}}</v-card-text></v-col>
            <v-col cols="6"><v-card-text>{{user.email}}</v-card-text></v-col>
            <v-col cols="2"><v-btn icon><v-icon small class="fas fa-edit"></v-icon></v-btn></v-col>
          </v-row>
          <v-row align="center" class="grey lighten-5">
            <v-col cols="4"><v-btn class="grey">{{btn.changePassword}}</v-btn></v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'AccountPanel',
    
    data(){
      return {
        user: {
          firstName:"Satoru",
          lastName:"Nishizawa",
          email:"sample@gmail.com",
          password:"sampleps",
        },
        labels:{
          cardTitle:"User Profile",
          name:"User Name",
          email:"Email Address",
          password: "Passowrd"
        },
        btn:{
          changePassword: "Change Password",
          edit: "Edit",
          confirm: "Confirm",
        },
      };
    },
  }
</script>