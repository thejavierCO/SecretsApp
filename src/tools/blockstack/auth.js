import {showConnect} from "@stacks/connect";
import {Person} from "@stacks/profile";
import {Database} from "./storage";
import {App} from "./index";

export class AuthConfig{
    constructor(App,userSession){
        this.appDetails = {
            name:App.name,
            icon:App.icon
        }
        this.redirectTo = "/"
        this.finished = ({ userSession }) => {
            console.log(userSession.loadUserData());
        }
        this.userSession = userSession||undefined;
    }
}
export class Auth{
    /**
     * @param {App} App 
     */
    constructor(App){
        if(App.userSession.isSignInPending()){
            App.userSession.handlePendingSignIn().then((userData)=>{
                this.Storage = new Database({userSession:App.userSession});
                this.Person = new Person(userData.profile);
            })
        }else if(App.userSession.isUserSignedIn()){
            this.Storage = new Database({userSession:App.userSession});
            this.Person = new Person(App.userSession.loadUserData().profile);
        }
        this.authConfig = ()=>App.AuthConfig;
        this.userSession = ()=>App.userSession;
        this.connect = ()=>showConnect(this.authConfig())
    }
    get isSignIn(){return this.userSession().isUserSignedIn()}
    login(f){
        this.connect();
        this.userSession().isSignInPending()?
        this.userSession()
        .handlePendingSignIn()
        .then(e=>typeof f === "function"?f(e):e)
        :false
    }
    exit(){this.userSession().signUserOut()}
}