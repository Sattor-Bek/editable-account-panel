
<template>
    <div>
      <div :class="classObj.card.content">
        <div><i :class="classObj.icons.email"></i> {{labels.email}}</div>
        <div>{{user.email}}</div>
        <div>
          <i :class="formStatus.icon" v-on:click="switcher"></i>
        </div>
      </div>      
        <form v-if="editingEmail">
            <label for="email">{{labels.email}}</label>
            <div class="email-form-block">
                <div class="form-box">
                    <input type="email" @keypress.enter="submit" v-model="email" required class="email">
                    <div class="error-message">{{emailValidation}}</div>
                </div>
                <button class="submit" v-on:click="submit">{{labels.submit}}</button>
            </div>
            
        </form>        
    </div>
</template>
<script>
import { User } from '@/models/user.js';
import { validation } from '@/utilities/validation.js'; 
import { classObj, labels , formHandler} from '@/utilities/textData.js';
  export default {
    name: 'EmailForm',
    props:{
        user: {
            type: User
        },
    },
    created(){
        this.email = this.user.email;
    },
    data(){
        return {
            email: "",
            labels: labels,
            classObj: classObj,
            editingEmail: false,
        }
    },
    computed: {
        formStatus: function(){
            return formHandler(this.editingEmail);
        },
        emailValidation: function(){
            return validation('email', this.email);
        }
    },
    methods:{
        submit: function(){
            if(this.emailValidation == true){
                this.$emit("input", this.email);
            }
        },
        switcher: function(){
                return this.editingEmail ? 
                this.editingEmail = false : this.editingEmail = true;     
            },
        
        }
    }
</script>
