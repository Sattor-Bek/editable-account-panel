
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
            <form class="password-form" @submit.prevent="submit">
                <label class="password-label" for="oldPassword">{{labels.oldPassword}}</label>
                <div class="password-form-block">
                  <div class="form-block">
                      <i :class="mask.eye" @click="unmasking"></i>
                    </div>
                    <div class="form-block">
                      <input name="oldPassword" :type="mask.type" v-model="oldPassword" :class="invalidate" required>
                      <div class="error-message" :class="invalidate">{{oldPasswordValidation}}</div>                    
                    </div>
                  </div>
                  <label class="password-label" for="newPassword">{{labels.newPassword}}</label>
                  <div class="password-form-block">

                  <div class="form-block">
                    <i :class="mask.eye" @click="unmasking"></i>
                  </div>
                  <div class="form-block">
                    <input name="newPassword" :type="mask.type" v-model="newPassword" :valid="newPasswordValidation" required>
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
                    <button class="submit"  @click="submit">{{labels.submit}}</button>
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
            if(this.oldPasswordIsValid && this.newPasswordIsValid){
                this.$emit("input", this.newPassword);
                this.editingPassword = false;
            } else {
              return;
            }
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
          console.log(this.oldPasswordIsValid)
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
        oldPasswordIsValid(){
          return typeof this.oldPasswordValidation == "boolean" ? this.oldPasswordValidation : false;
        },
        newPasswordValidation(){
          return validation('newPassword', this.newPassword);
        },
        invalidate(){
          return this.oldPasswordIsValid ? "": "invalid"
        }
    }
  }
</script>
