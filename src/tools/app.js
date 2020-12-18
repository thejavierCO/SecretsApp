import { AppConfig, UserSession, showConnect } from '@stacks/connect'
import { getUserData , getPerson , login , isLogin , unLognin , isPendingLogin} from "./auth";
import { StorageApp } from "./storage";
/**
 * config base
 * @typedef {{
 *  appDetails:{
 *     name:string,
 *    icon:string
 * },
 *  redirectTo:string,
 *   finished:Function,
 *  userSession:UserSession
 * }} configjson   configuracion de la aplicacion
 */

/**
 * Configuracion basica
 * @param {string} name name
 * @param {string} icon icono de la apliacaion
 * @param {string} root ruta de redireccion
 * @param {Function} finished funcion al finalizar todo el processo
 * @param {UserSession} userSession datos de session
 * @return {configjson}
 */
const configApp = (
  name = 'defaultApp',
  icon = window.location.origin + '/logo.svg',
  root = '/',
  finished = () => {
    window.location.reload()
  },
  userSession,
) => ({
  appDetails: {
    name,
    icon,
  },
  redirectTo: root,
  finished,
  userSession,
})
/**
 * factory make app
 */
export class Service {
  constructor() {
    this.apps = [];
    this.permicions = [];
    this.config = configApp();
    this.App = App;
  }
  useAppClass(ClassApp){
    if(ClassApp instanceof App){
      this.App = ClassApp;
    }else{
      throw {error:"not is instance of App"}
    }
  }
  setPermisions(...permicions){
    return this.permicions = permicions;
  }
  makeApp(name,icon){
    return new this.App(name,icon,this);
  }
}

export class App{
  constructor(name,icon,Service){
    this.config = {...Service.config}
    this.config.appDetails.name = this.name = name;
    this.config.appDetails.icon = this.icon = icon;
    this.Appconfig = new AppConfig(Service.permicions);
    this.userSession = new UserSession(this.AppConfig);
    Service.apps.push(this);
    this._Auth = new Auth(this);
  }
  useAuthClass(ClassAuth){
    this.Auth = ClassAuth;
  }
  get Auth(){
    return this._Auth;
  }
  set Auth(ClassAuth){
    let test = new ClassAuth(this);
    if(test instanceof Auth){
      this._Auth = test;
    }else{
      throw {error:"not is instance of auth"}
    }
  }
}

export class Auth{
  constructor(App){
    this.login = ()=>{
      login(showConnect,App.config)
      return isPendingLogin(App.userSession)?App.userSession.handlePendingSignIn():new Promise((res,rej)=>{res(false)})
    };
    this.isLogin = ()=>isLogin(App.userSession);
    this.exitAuth = ()=>unLognin(App.userSession);
    this.App = App;
    this.StorageUse = StorageApp;
  }
  useStorageClass(ClassStorage){
    if(ClassStorage instanceof StorageApp){
      this.StorageUse = ClassStorage;
    }else{
      throw {error:"not is instance of StorageApp"}
    }
  }
  get getUserData(){
    return getUserData(this.App.userSession);
  }
  get getPerson(){
    return getPerson(this.App.userSession);
  }
  get Storage(){
    return new this.StorageUse(this.App.userSession);
  }
}