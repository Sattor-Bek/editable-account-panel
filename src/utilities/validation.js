import zxcvbn from 'zxcvbn';

export const oldPasswordRules = [
    v => !!v || 'Old password is required'
  ]
export const newPasswordRules = [
    v => !!v || 'New password is required'
]

export const firstNameRules = [
    v => !!v || 'First name is required'
  ]

  export const lastNameRules = [
    v => !!v || 'Last name is required',
  ]

export const emailRules = [
    v => !!v || 'Email is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ];


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