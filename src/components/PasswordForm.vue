
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
                            <v-card-text>
                                <v-row align="center">
                                    <v-col cols="1">
                                        <v-btn icon @click="unmasking">
                                            <v-icon small :class="mask.eye"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="11">
                                        <v-text-field :type="mask.type" v-model="oldPassword" label="Input your old password"></v-text-field> 
                                    </v-col>
                                </v-row>
                                <v-row align="center">
                                    <v-col cols="1">
                                        <v-btn icon @click="unmasking">
                                            <v-icon small :class="mask.eye"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="11">
                                        <v-text-field :type="mask.type" v-model="newPassword" label="Input your new password"></v-text-field> 
                                    </v-col>
                                </v-row>
                                <v-col justify-content="end">
                                    <v-row>
                                        <v-col cols="3" v-for="(score, index) in strengthScoreMeter" :key="index" class="pa-2" :class="score.class"></v-col>
                                    </v-row>
                                    <v-row>
                                        {{strengthMessage}}
                                    </v-row>                                    
                                </v-col>
                            </v-card-text>
                            <v-card-text>
                                <v-card-text>

                                </v-card-text>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn @click="submit">Confirm</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
        </v-dialog>
        <snackbar-message :text="message" :snackbar="snackbar" @close="snackbar = false"/>
    </v-row>
</template>
<script>
  import { User } from '@/models/user.js';
  import { passwordValidation,  passwordStrength} from '@/utilities/validation.js';
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
            unmasked: false,
            editingPassword: false,
            snackbar: false,
        }
    },
    methods:{
        submit: function(){
            const response = passwordValidation(this.user.password, this.oldPassword, this.newPassword);
            if(response.validity){
                this.$emit("input", this.newPassword);
                this.editingPassword = false;
            }
            this.openSnackbar(response.text);
      },
      openSnackbar: function(message){
          this.message = message;
          this.snackbar = true;
      },
      unmasking: function(){
          this.unmasked ? this.unmasked = false : this.unmasked = true;
      }
    },
    computed: {
        passwordStrengthScore: function(){
            let score = null;
            if(this.newPassword && this.newPassword.length > 0){
                score = passwordStrength(this.newPassword).score;
            }
            return score
        },
        strengthMessage: function(){
            let passwordStrength = "Password strength: "; 
            switch(this.passwordStrengthScore){
                case 0: return passwordStrength + "Fragile"
                case 1: return passwordStrength + "Weak"
                case 2: return passwordStrength + "Fair"
                case 3: return passwordStrength + "Strong"
                case 4: return passwordStrength + "Very Strong"
                default: return "Please input password"
            }
        },
        strengthScoreMeter: function(){
            const colorSet = [
                {score:0, class: "grey"}, 
                {score:1, class: "red"},
                {score:2, class: "orange"}, 
                {score:3, class: "yellow"},
                {score:4, class: "green"}
                ];
            let defaultValue = colorSet.find(set => set.score == 0);
            let meter = Array(4).fill(defaultValue);
            const score = this.passwordStrengthScore;
            if(score > 0){
                const set = colorSet.find(set => set.score == score)
                meter.fill(set, 0, score)
            }
            return meter;
        },
        mask: function(){
            const mask = {
                    eye: "fas fa-eye",
                    type:"password"
                };
            const unmask = {
                eye: "fas fa-eye-slash",
                type:"text"
                };
            return this.unmasked ?  unmask : mask
        }
    }
  }
</script>
