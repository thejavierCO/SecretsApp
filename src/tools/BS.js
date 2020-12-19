import {encryptContent,decryptContent} from "@stacks/encryption";
import {showBlockstackConnect,showConnect,AppConfig, UserSession} from "@stacks/connect";
import {Person} from "@stacks/profile";
import {Storage} from "@stacks/storage";
import { v4 } from "uuid";
/**
 * Factory module class
 */
export class ModuleModel{
    use(classUse){
        if(typeof classUse === "object"&&!Array.isArray(classUse)){
            for (const className in classUse) {
                if (Object.hasOwnProperty.call(classUse, className)) {
                    const data = classUse[className];
                    this[className] = {
                        base:data,
                        get call(){
                            return this.base
                        },
                        set call(a){
                            if(/class/i.test(a)){
                                return this.base = a;
                            }else{
                                throw {error:"require class"}
                            }
                        }
                    }
                }
            }
        }
    }
}
/**
 * Factory Storage
 */
export function File(nameFile,model){
    const name = nameFile.split(".").filter((a,b,c)=>b!==c.length-1).join(".");
    const extension = nameFile.split(".").filter((a,b,c)=>b===c.length-1).join(".");
    const {call} = model.Storage;
    const stge = new call(model.options);
    let nameF = nameFile.split(".").filter((a,b,c)=>b!==c.length-1).join("_")===""?nameFile:nameFile.split(".").filter((a,b,c)=>b!==c.length-1).join("_");
    return {
        get [nameF](){
            return stge.getFile(name+"."+extension).catch(err=>{
                throw {error:"not exist file or other problem",err}
            })
        },
        set [nameF](data){
            if(typeof data === "string")return stge.putFile(name+"."+extension,data);
            else throw {error:"require string"}
        },
        delete:()=>stge.deleteFile(nameF+"."+(nameF===extension?"":extension)),
        name:nameF,
        extension:nameF===extension?false:extension
    }
}
export class StorageUse extends ModuleModel{
    constructor(options){
        super();
        this.use({Storage})
        this.options = options
    }
    File(...name){
        if(name.length===1&&typeof name[0] === "string"){
            return File(name[0],this);
        }else return name.map(e=>this.File(e))
    }
    async Files(){
        const {call} = this.Storage;
        let files = [];
        return await new call(this.options).listFiles((n)=>{files.push(n);return true}).then(_=>files);
    }
}
/**
 * Factory App
 */
export class AppBlockStack extends ModuleModel{
    constructor(){
        super();
        this.use({App})
        this.app = [];
    }
    /**
     * @param {string} name
     * @param {string} icon
     * @param {{
     *      scopes?:Array<string>
     *      appDomain?:string
     *      redirectPath?:string
     *      manifestPath?:string
     *      coreNode?:string|undefined
     *      authenticatorURL?:string
     *      name:string
     *      icon:string
     * }} config 
     * @returns {App}
     */
    CreateApp(name,icon,config=new AppConfig()){
        let {call} = this.App
        if(name){
            config.name = name||undefined;
            config.icon = icon||undefined;
            let instance = new call(config); 
            this.app.push(instance);
            return instance;
        }else{
           throw {error:"require name app"}
        }
    }
}
/**
 * App Individual
 */
export class App extends ModuleModel{
    /**
     * @param {{
     *      scopes?:Array<string>
     *      appDomain?:string
     *      redirectPath?:string
     *      manifestPath?:string
     *      coreNode?:string|undefined
     *      authenticatorURL?:string
     *      name:string
     *      icon:string
     * }} config 
     */
    constructor(config){
        super();
        this.use({Auth});
        let {name,icon} = config;
        this._name = name;
        this._icon = icon;
        this._config = config;
        this._userSession = {appConfig:config}
    }
    /**
     * @returns {Auth}
     */
    Accounts(){
        let {call} = this.Auth
        return new call(this);
    }
    get name(){
        return this._name
    }
    set name(a){
        if(typeof a === "string"){
            this._name = a;
        }else{
            throw {error:"require string"}
        }
    }
    get icon(){
        return this._icon
    }
    set icon(a){
        if(typeof a === "string"){
            this._icon = a;
        }else{
            throw {error:"require string"}
        }
    }
    get Appconfig(){
        return new AppConfig(this.config);
    }
    get userSession(){
        return new UserSession(this._userSession);
    }
}
/**
 * Auth Individual
 */
export class Auth extends ModuleModel{
    /**
     * @param {App} App intance app
     */
    constructor(App){
        super();
        let {name,icon} = App;
        if(App.userSession.isSignInPending()){
            App.userSession.handlePendingSignIn().then((userData)=>{
                this.Storage = new StorageUse({userSession:App.userSession});
                this.Person = new Person(userData.profile);
            })
        }else if(App.userSession.isUserSignedIn()){
            this.Storage = new StorageUse({userSession:App.userSession});
            this.Person = new Person(App.userSession.loadUserData().profile);
        }
        this.authOptions = {
            appDetails: {
                name: name||v4(),
                icon: icon||window.location.origin+"/logo.svg",
            },
            redirectTo: '/',
            finished: ({ userSession }) => {
                console.log(userSession.loadUserData());
            },
            userSession:App.userSession
        };
        this.App = App;
    }
    get isSignIn(){
        return this.App.userSession.isUserSignedIn();
    }
    login(){showConnect(this.authOptions);}
    exit(){this.App.userSession.signUserOut()}
}