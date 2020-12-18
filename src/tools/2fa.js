import twoFactor from "node-2fa";
import {Auth} from "./app"

export class TwoFactorAuthenticate{
    constructor(App,Auth){
        this.secrets = twoFactor.generateSecret({name:App,account:Auth})
    }
    get token(){
        return twoFactor.generateToken(this.secrets.secret).token
    }
    check(token,secret=this.secrets.secret){
        let {delta} = twoFactor.verifyToken(secret,token)
        if(typeof delta === "number"){
            if(delta===-1)return {OK:"too late",status:delta}
            else if(delta===0)return {OK:"the current",status:delta}
            else if(delta===1)return {OK:"too early",status:delta}
        }else{
            throw {error:"not process"}
        }
    }
    getToken(secret){
        return twoFactor.generateToken(secret)
    }
    get Qr(){
        return this.secrets.uri
    }
}

export class Auth2FaService extends Auth{
    constructor(App){
        super(App);
        let {name} = App;
        if(this.isLogin()){
            this.Storage.Files(e=>{
                if(e==="auth.json"){
                    let configFile = this.Storage.File("auth.json");
                    configFile.Content.then(e=>{
                        localStorage.setItem("config",e);
                    })
                    // configFile.delete();
                }
            })
            if(localStorage.getItem("config")===null){
                let configFile = this.Storage.File("auth.json");
                this.Sv = new TwoFactorAuthenticate(name,this.getUserData.username);
                this.secret = this.Sv.secrets.secret;
                localStorage.setItem("config",btoa(this.secret));
                configFile.Content = btoa(this.secret);
            }
        }
    }
    New(auth,app){
        return new TwoFactorAuthenticate(auth,app);
    }
    token(secret){
        return twoFactor.generateToken(secret)
    }
    check(token,secret){
        let {delta} = twoFactor.verifyToken(secret,token)
        if(typeof delta === "number"){
            if(delta<=-1)return {OK:"too late",status:delta}
            else if(delta===0)return {OK:"the current",status:delta}
            else if(delta>=1)return {OK:"too early",status:delta}
            else console.log(delta)
        }else{
            throw {error:"not process"}
        }
    }
    Qr(){
        return this.Sv.Qr;
    }
}