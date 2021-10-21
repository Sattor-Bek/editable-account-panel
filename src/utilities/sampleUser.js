import * as md5 from 'md5';
import { config } from '../config.js';

export function assignDefaultUser() {
    console.log("starting assignment")
    console.log(config)
    let sampleUser = config.sampleUser;
    if(sampleUser && !sampleUser.avatar){
        const baseUrl= config.gravatarBaseUrl;
        const email = sampleUser.email;
        const hash = md5(email);
        const url = baseUrl+hash;
        sampleUser.avatar = url;
    }
    return sampleUser
  }
