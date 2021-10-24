
<template>
<div>
    <div :class="classObj.card.content">
        <div><i :class="classObj.icons.user"></i> {{labels.name}}</div>
        <div>
            <span>
                {{user.firstName}} {{user.lastName}}
            </span>
        </div>
        <div>
            <i v-on:click="switcher" :class="formStatus.icon"></i>
        </div>
    </div>
    <form v-if="editingName">
        <div class="name-form-block">
            <div>
                <label for="first-name">{{labels.firstName}}</label>                            
                <div class="form-box">
                    <input type="text" @keypress.enter="submit" v-model="name.firstName" class="first-name" required>
                    <div class="error-message">{{firstNameValidation}}</div>
                </div>
            </div>
            <div>
                <label for="last-name">{{labels.lastName}}</label>
                <div class="form-box">
                    <input type="text" @keypress.enter="submit" v-model="name.lastName" class="last-name" required>
                    <div class="error-message">{{lastNameValidation}}</div>
                </div>
            </div>
            <button class="submit" v-on:click="submit">{{labels.submit}}</button>
        </div>
    </form>
</div>
</template>
<script>
  import { User } from '@/models/user.js';
  import { validation } from "@/utilities/validation.js";
  import { classObj, labels , formHandler} from '@/utilities/textData.js';
  export default {
    name: 'NameForm',
    props:{
        user: {
            type: User
        },
    },
    created(){
        this.name.firstName = this.user.firstName;
        this.name.lastName = this.user.lastName;
    },
    computed: {
        formStatus: function(){
            return formHandler(this.editingName, 'name-form');
        },
        firstNameValidation: function(){
            return validation("firstName", this.name.firstName);
        },
        lastNameValidation: function(){
            return validation("lastName", this.name.lastName);
        },        
    },
    data(){
        return {
            name: {
                firstName: "",
                lastName: "",
            },
            classObj: classObj,
            labels: labels,
            editingName: false,
        }
    },
    methods:{
        switcher: function(){
            return this.editingName ? 
            this.editingName = false : this.editingName = true;     
        },
        submit: function(){
            if(this.firstNameValidation === true && this.lastNameValidation === true){
                this.$emit('input', this.name);
            } else {
                return;
            }
          },
    }
  }
</script>