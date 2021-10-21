import zxcvbn from 'zxcvbn';
export function passwordValidation(originalPass, oldPassword, newPassword){
    let text = "";
    let validity = false;
    if(oldPassword.length > 0 && oldPassword === originalPass){
        text = "Success";
        validity = true;
    } else {
        text = "Old password is not valid"
    }
    if(!newPassword){
        text = "Please input new password"; 
    }
    const response = {text: text, validity: validity}
    return response;
}

export function passwordStrength(passoword){
    return passoword && passoword.length > 0 ? zxcvbn(passoword) : ""
}
