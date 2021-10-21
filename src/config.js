const gravatarBaseUrl = process.env.VUE_APP_GRAVATAR_BASE_URL;
const sampleUserData = {
    id: process.env.VUE_APP_SAMPLE_ID,
    firstName: process.env.VUE_APP_SAMPLE_FIRST_NAME,
    lastName: process.env.VUE_APP_SAMPLE_LAST_NAME,
    email: process.env.VUE_APP_SAMPLE_EMAIL,
    password: process.env.VUE_APP_SAMPLE_PASSWORD,
    avatar: process.env.VUE_APP_SAMPLE_AVATAR,
}

export const config = {
    sampleUser: sampleUserData,
    gravatarBaseUrl: gravatarBaseUrl
}