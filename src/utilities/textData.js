export const classObj = {
    icons: {
      user: "fa fa-user fa-lg fa-fw",
      edit: "fas fa-edit",
      email: "fa fa-envelope fa-lg fa-fw",
      close: "fas fa-window-close",
    },
    card:{
      card: "card",
      content: "content",
      title: "content cardTitle",
      avatar: "content avatar",
      enabled: " enabled"
    },
    types: {
      checkbox: "checkbox"
    },
    colspan: "3"
  }
export function formHandler(bool, text){
    if(bool){
      return {
        icon: classObj.icons.close,
        form: text+ classObj.card.enabled,
        }
    } else {
      return {
        icon: classObj.icons.edit,
        form: text,
    }
  }
}

export const labels = {
    title:"User Profile",
    name:"User Name",
    email:"Email Address",
    password: "Passowrd",
    submit: "Submit",
    cancel: "cancel",
    changePassword: "Change Password",
    firstName: "First Name",
    lastName: "Last Name",
    modalHead:"You are changing password",
    oldPassword:"Current password",
    newPassword:"New password" 
  }
