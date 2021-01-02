import {Profile} from "@stacks/profile"
import {showConnect,AppConfig,UserSession} from "@stacks/connect";
import {Storage as Almacenamiento} from "@stacks/storage"

class AuthConfig{
    constructor(config={name:"undefinedApp",icon,redirectTo:"/",finished,appConfig}){
        let {
            name="undefinedApp",
            icon=window.location.origin + '/logo.svg',
            redirectTo="/",
            finished=() => {
                window.location.reload();
            },
            appConfig
        } = config;
        this.appDetails = {name,icon};
        this.redirectTo = redirectTo;
        this.finished = finished;
        this.userSession = new UserSession({appConfig});
    }
    get isSignIn(){
        return this.userSession.isUserSignedIn();
    }
    get isPending(){
        return this.userSession.isSignInPending();
    }
    get awaitSignIn(){
        if(this.isPending){
            return this.userSession.handlePendingSignIn()
            .catch(err=>{throw err})
        }else if(this.isSignIn){
            return new Promise((res,rej)=>res(this.userSession.loadUserData()))
        }
    }
}


export default class App{
    constructor(name,icon,finished,redirectTo){
        this.name = name;
        this.icon = icon;
        this.appConfig = new AppConfig(['store_write','publish_data']);
        if(typeof finished === "function")this.finished = finished;
        if(typeof redirectTo === "string")this.redirectTo = redirectTo;
    }
    get Auth(){
        return new Auth(this);
    }
}

export class Auth extends AuthConfig{
    constructor(App){
        super(App);
        this.login = ()=>!this.isSignIn?showConnect(this):false;
        this.exit = ()=>this.isSignIn?this.userSession.signUserOut():false;
        this.Profile = ()=>new Profile(this.userSession.loadUserData().profile)
    }
    get user(){
        return this.userSession.loadUserData()
    }
    get Storage(){
        return new Storage({userSession:this.userSession});
    }
}

export class Storage extends Almacenamiento{}