
<template>
  <div>
    <div class="password-modal">
        <button @click="switcher">{{labels.changePassword}}</button>
    </div>
    <transition name="modal" v-if="editingPassword">
      <div class="modal-mask">
        <div class="modal-wrapper" @click.self="close">
          <div class="modal-container">
            <div class="cardTitle">{{labels.modalHead}}</div>

            <form class="password-form">
                <label class="password-label" for="oldPassword">{{labels.oldPassword}}</label>
                <div class="password-form-block">
                  <div class="form-block">
                      <i :class="mask.eye" @click="unmasking"></i>
                    </div>
                    <div class="form-block">
                      <input name="oldPassword" :type="mask.type" v-model="oldPassword" required>
                      <div class="error-message">{{oldPasswordValidation}}</div>                    
                    </div>
                  </div>
                  <label class="password-label" for="newPassword">{{labels.newPassword}}</label>
                  <div class="password-form-block">

                  <div class="form-block">
                    <i :class="mask.eye" @click="unmasking"></i>
                  </div>
                  <div class="form-block">
                    <input name="newPassword" :type="mask.type" v-model="newPassword" required>
                    <div class="error-message">{{newPasswordValidation}}</div>
                  </div>
                </div>
                <div class="password-security-checker">
                  <div class="bar">
                    <div v-for="(item, index) in score.classList" 
                    :key="index"
                    class="grid" 
                    :class="item">                                
                    </div>                            
                  </div>
                  <div>{{score.message}}</div>  
                </div>              
                <div class="button-box">
                    <button class="cancel"  @click="switcher">{{labels.cancel}}</button>
                    <button class="submit"  @click="switcher">{{labels.submit}}</button>
                </div>                
              </form>
            </div>              
        </div>
      </div>
    </transition>    
  </div>
</template>
<script>
  import { User } from '@/models/user.js';
  import { validation, passwordScore} from '@/utilities/validation.js';
  import { classObj, labels } from '@/utilities/textData.js';
  export default {
    name: 'PasswordForm',
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

            labels: labels,
            classObj: classObj,
            unmasked: false,
            editingPassword: false,
            snackbar: false,
        }
    },
    methods:{
        submit: function(){
            if(this.valid){
                this.$emit("input", this.newPassword);
                console.log("valid")
                this.editingPassword = false;
            }
        },
        valid: function(){
          return this.oldPasswordValidation === true && this.newPasswordValidation === true
        },
        unmasking: function(){
          this.unmasked ? this.unmasked = false : this.unmasked = true;
        },
        switcher: function(){
            this.oldPassword = ""; 
            this.newPassword = "";
            return this.editingPassword ? this.editingPassword = false
            : this.editingPassword = true;
        },
        close: function(){
            if(this.editingPassword){
                this.editingPassword = false;
            }
        }
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
        },
        oldPasswordValidation(){
          return validation('oldPassword', this.oldPassword, this.user.password);
        },
        newPasswordValidation(){
          return validation('newPassword', this.newPassword);
        }
    }
  }
</script>
