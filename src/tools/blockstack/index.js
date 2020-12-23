import {AppConfig,UserSession} from "@stacks/connect";
import {AuthConfig,Auth} from "./auth";

export class App{
    constructor(name,icon){
        this.name = name;
        this.icon = icon||window.location.origin+"/logo.svg";
        this.AuthConfig = new AuthConfig(this);
        this.appConfig = new AppConfig();
        this.AuthConfig.userSession = new UserSession({appConfig:this.appConfig});
    }
    get userSession(){
        return this.AuthConfig.userSession;
    }
    get Auth(){
        return new Auth(this);
    }
}