<template>
<div>
  <div id="profile-panel">
    <div :class="classObj.card.card">
      <div>
        <div :class="classObj.card.title">
          {{labels.title}}
        </div>
        <img :class="classObj.card.avatar" v-bind:src="user.avatar">
        <name-form :user="user" @input="changeName"/>
        <email-form :user="user" @input="changeEmail" /> 
        <password-form :user="user" @input="changePassword"/>      
      </div>
    </div>
  </div>
  <snackbar-message :text="message" :snackbar="snackbar" @close="snackbar = false"/>
</div>
</template>

<script>
  import { User } from '@/models/user.js';
  import { assignDefaultUser } from '@/utilities/sampleUser.js';
  import { classObj, labels } from '@/utilities/textData.js';
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
        classObj: classObj,
        labels: labels,
        message:"",
        snackbar: false,
        windowSize: {
          x: 0,
          y: 0,
        },
      };
    },
    mounted () {
      this.onResize()
    },
    computed: {
        computedClassObj: function(){
            return this.classObj;
          }
    },    
    methods: {
      onResize() {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      },
      changeName: function(name){
        const uf = this.user.firstName;
        const ul = this.user.lastName;
        const nf = name.firstName;
        const nl = name.lastName;
        if(uf == nf && ul == nl){
          return
        } else {
          this.user.firstName = nf;
          this.user.lastName = nl;
          let message = "Successfully changed the " + this.changedNameis(uf,ul,nf,nl);
          this.openSnackbar(message)
        }
      },
      changeEmail: function(email){
        if(this.user.email != email){
            this.user.email = email;
            this.openSnackbar("Successfully changed Email address");
        }
      },
      changePassword: function(password){
        if(this.user.password != password){
          this.user.password = password;
          this.openSnackbar("Successfully changed the password"); 
        }
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
<style>
#profile-panel {
  position: relative;
	margin: 40px 3%;
  min-width: 320px;
  justify-items: center;
  text-align: center;
}
.card {
  text-align: left;
  position: relative;
  width: 500px;
  max-width:600px;
  margin:0 auto;
  display: grid;
  background-color: #f5f5f5;
  box-shadow: 1px 1px 0#aaaaaa;
  border-radius: 8px;
} 
.content {
  display: inline-block;
  display: grid;
  grid-template-columns: 1fr 1fr 0.1fr;
  padding: 16px;
}

.avatar {
    size: 120px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
}

.cardTitle {
      font-size: 24px;
}

form {
    padding: 8px;
    display: block;
    align-content: center;
    background-color: #ffffffe5;
}

form label{
    display: block;
    padding: 0, 0, 8px, 2px;
    font-size:11px;
}

input {
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    padding: 8px;
    border-top: none;
    border-left: none;
    border-right: none;
}

.name-form-block {
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.email-form-block {
  display: grid;
  grid-template-columns: 6fr 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.form-box {
  display: inline-block;
}

input::before {
  border-bottom-color: #22577A ;
}

input:focus{
  outline: none;
  border-bottom-color: #38A3A5;
  transition: 0.8s;
}

input:invalid {
  border-bottom-color: #B61919;
}

/* input.password:not(:focus):invalid {
  border-bottom-color: #22577A ;
} */

.error-message {
  font-size: 11px;
  color: transparent;
}

input:invalid + .error-message  {
  color: #B61919;
  display: block;
}

/* input.password:not(:focus):invalid + .error-message {
  color: transparent;
} */

input.email{
  width: 80%;
}

button {
  display: inline-block;
  background-color: transparent;
  height: 32px; 
  border-radius: 8px;
  border: none;
  text-transform: uppercase;
  font-weight: bold;
  margin-left: 8px;
  margin-right: 8px;
}

form button.submit  {
  width: 80px;
  background: #57CC99;
  border: none;
  box-shadow: 0 1px 0#aaaaaa;
}

form button.submit:hover{
  background: #38A3A5;
  transition: 0.3s ease-in-out;
}

form button.submit:active{
  background:  #38A3A5;
  box-shadow: 1px 1px 0#aaaaaa;
}

button.cancel {
  color: #fffffff5;
  width: 80px;
  background: #22577A;
  border: none;
  box-shadow: 0 1px 0#aaaaaa;
}

button.cancel:hover{
  background: #aaaaaa;
  transition: 0.3s ease-in-out;
}

button.cancel:active{
  background:  #38A3A5;
  box-shadow: 1px 1px 0#aaaaaa;
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 480px;
  width: 80%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #00000054;
  transition: all 0.8s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.password-modal {
  display: flex;
  padding: 16px;
  justify-content: center;
}

.password-modal button {
  color: #fffffff5;
  display:block;
  margin: 0 auto;
  padding: 8px;
  background: #22577A;
  box-shadow: 0 1px 0#aaaaaa;
}

.password-modal button:hover{
  background: #38A3A5;
  transition: 0.3s ease-in-out;
}

.password-modal button:active{
  background:  #38A3A5;
  box-shadow: 2px 1px 0#aaaaaa;
}


.password-form-block{
  display: grid;
  grid-template-columns: 0.5fr 6fr;
  padding-bottom: 16px;
  width: 100%;
}

.password-form-block input{
  width: 100%;
}

.password-label{
  padding-left: 32px;
}

.password-security-checker {
  padding-left: 32px;
}

.password-security-checker .bar {
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.grid{
  padding: 8px;
  height: 2px;
}
.grid.grey{
  background-color: #aaaaaa;
}

.grid.red {
  background-color: #B61919;
}

.grid.yellow {
  background-color: #e1e101dc;
}

.grid.orange {
  background-color: #FF9900;
}

.grid.green {
  background-color: #38A3A5;
}

.button-box {
  margin: 0 0 0 auto;
  text-align: right;  
}

.snackbar-wrapper {
  text-align: center;
  width: 100%;
  position: fixed;
    bottom: 0;
}

.snackbar {
  display: grid;
  grid-template-columns: 10fr 2fr;
  max-width: 400px;
  text-align: left;
  padding: 8px;
  position: relative;
  left:0;
  right:0;
  margin: auto;
  background-color: #22577A;
  box-shadow: 0 2px 8px #00000054;
  border-radius: 2px;
  color:#aaaaaa;
  font-size: 16px;
  opacity: 0;
  transition: bottom 0.3s ease-in-out;
}
.snackbar.on {
  color: #00000054;
  opacity: 1;
  transition: 0.3s ease-in-out;
}

.snackbar.off{
  opacity: 0;
  position: relative;
  bottom: -50px;
  transition: 0.3s ease-in-out;
}
</style>
