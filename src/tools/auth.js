import {Person} from "@stacks/profile";

export function getUserData(userSession){
    try{
        return userSession.loadUserData();
    }catch(err){
        throw {error:"not login",more:err}
    }
}

export function getPerson(userSession){
    try{
        return new Person(getUserData(userSession).profile);
    }catch(err){
        throw {error:"not login",more:err}
    }
}

export function login(showConnect,configApp){showConnect(configApp)}

export function isLogin(userSession){return userSession.isUserSignedIn()}
export function isPendingLogin(userSession){return userSession.isSignInPending()}

export function unLognin(userSession){return userSession.signUserOut()}