import twoFactor from "node-2fa";
import {Auth} from "./app"

export class TwoFactorAuthenticate{
    constructor(App,Auth){
        this.secrets = twoFactor.generateSecret({name:App,account:Auth})
    }
    get token(){
        return twoFactor.generateToken(this.secrets.secret).token
    }
    check(token){
        let {delta} = twoFactor.verifyToken(this.secrets.secret,token)
        if(typeof delta === "number"){
            if(delta===-1)return {OK:"too late",status:delta}
            else if(delta===0)return {OK:"the current",status:delta}
            else if(delta===1)return {OK:"too early",status:delta}
        }else{
            throw {error:"not process"}
        }
    }
}

export class Auth2FaService extends Auth{
    constructor(App){
        super(App);
        let {name} = App;
        if(App.isLogin()){
            console.log(this.getUserData,name)
        }
    }
}