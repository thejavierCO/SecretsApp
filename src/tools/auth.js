import {Person} from "@stacks/profile";

export function getUserData(userSession){
    try{
        let {loadUserData} = userSession;
        return loadUserData();
    }catch(err){
        throw {error:"not login",more:err}
    }
}

export function getPerson(userSession){
    try{
        let {profile} = getUserData(userSession);
        return new Person(profile);
    }catch(err){
        throw {error:"not login",more:err}
    }
}

export function login(showConnect,configApp){showConnect(configApp)}

export function isLogin(userSession){return userSession.isUserSignedIn()}

export function unLognin(userSession){return userSession.signUserOut()}