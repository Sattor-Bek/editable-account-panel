import zxcvbn from 'zxcvbn';

const passwordSafetyScoreType = [
    {
        score:0, 
        class: "grey",
        message: "Password Strength: Very Weak",
        classList:[],
    }, 
    {
        score:1, 
        class: "red",
        message: "Password Strength: Weak",
        classList:[],
    },
    {
        score:2, 
        class: "orange",
        message: "Password Strength: Fair",
        classList:[],
    }, 
    {
        score:3, 
        class: "yellow",
        message: "Password Strength: Strong",
        classList:[],
    },
    {
        score:4, 
        class: "green",
        message: "Password Strength: Very Strong",
        classList:[],
    }, 
    ];
    
export function passwordScore(password){
    let scoreData = {
        score: 0,
        class: "grey",
        message: "Please input password",
        classList:[],
    };
    let classList = Array(4).fill(scoreData.class);
    scoreData.classList = classList;
    if(password && password.length > 0){
        const score = zxcvbn(password).score;
        scoreData = passwordSafetyScoreType.find(newScore => newScore.score == score);
        classList.fill(scoreData.class, 0, score);
        scoreData.classList = classList;
    }
    return scoreData
}

export function validation(text, data, op){
    switch(text){
        case('firstName'):
            return data.length > 0 ? true : 'First name is required';
        case('lastName'):
            return data.length > 0 ? true : 'Last name is required';
        case('email'):
            if(!data){
                return 'Email is required';
            } else {
                return /.+@.+\..+/.test(data) ? true :'Email must be valid email address';
            }
        case('oldPassword'):
            if(!data){
                return 'Current password is required'
            } else {
                return data === op ? true : 'Current Password must be correct';
            }
        case('newPassword'):
            return data.length > 0 ? true : 'New password is required';
        default:
            return false;
    }
}