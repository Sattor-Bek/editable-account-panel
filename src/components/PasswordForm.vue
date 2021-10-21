
<template>
    <v-row align="center" class="pa-5" >
        <v-col cols="4"><v-btn class="grey" @click="openDialog">Change Password</v-btn></v-col>    
        <v-dialog v-model="editingPassword" max-width="600">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">You are changing password</span>
                    </v-card-title>
                    <v-card-text>                    
                        <v-form ref="passwordForm">
                            <v-card-text>
                                <v-row align="center">
                                    <v-col cols="1">
                                        <v-btn icon @click="unmasking">
                                            <v-icon small :class="mask.eye"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="11">
                                        <v-text-field 
                                        v-model="oldPassword" 
                                        :rules="oldPasswordRules"
                                        :type="mask.type" 
                                        label="Input your old password" 
                                        required></v-text-field> 
                                    </v-col>
                                </v-row>
                                <v-row align="center">
                                    <v-col cols="1">
                                        <v-btn icon @click="unmasking">
                                            <v-icon small :class="mask.eye"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="11">
                                        <v-text-field
                                        v-model="newPassword" 
                                        :rules="newPasswordRules"
                                        :type="mask.type" 
                                        label="Input your new password" 
                                        required></v-text-field> 
                                    </v-col>
                                </v-row>
                                <v-col justify-content="end">
                                    <v-row>
                                        <v-col 
                                        cols="3" 
                                        v-for="(item, index) in score.classList" 
                                        :key="index" 
                                        class="pa-2" 
                                        :class="item"></v-col>
                                    </v-row>
                                    <v-row>
                                        {{score.message}}
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
    </v-row>
</template>
<script>
  import { User } from '@/models/user.js';
  import { oldPasswordRules, newPasswordRules, passwordScore} from '@/utilities/validation.js';
  export default {
    name: 'PasswordForm',
    props:{
        user: {
            type: User
        },
    },
    created(){
        const oldPassword = this.user.password;
        const rule = v => v === oldPassword || 'Old password must be correct';
        this.oldPasswordRules.push(rule);  
    },
    data() {
        return {
            oldPassword: "",
            newPassword: "",
            message: "",
            oldPasswordRules: oldPasswordRules,
            newPasswordRules: newPasswordRules,
            unmasked: false,
            editingPassword: false,
            snackbar: false,
        }
    },
    methods:{
        submit: function(){
            if(this.$refs.passwordForm.validate()){
                this.$emit("input", this.newPassword);
                this.editingPassword = false;
            }            
        },
        unmasking: function(){
          this.unmasked ? this.unmasked = false : this.unmasked = true;
        },
        openDialog: function(){
            this.oldPassword = ""; 
            this.newPassword = "";
            this.editingPassword = true;
        },
    },
    computed: {
        score: function(){
            return passwordScore(this.newPassword)
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
