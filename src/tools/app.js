import { AppConfig, UserSession, showConnect } from '@stacks/connect'
import { getUserData , getPerson , login , isLogin , unLognin } from "./auth";
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
    this.App = ClassApp;
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
    this.Auth = Auth;
  }
  useAuthClass(ClassAuth){
    this.Auth = ClassAuth;
  }
  get Auth(){
    return new Auth(this);
  }
}

export class Auth{
  constructor(App){
    this.login = ()=>login(showConnect,App.userSession);
    this.isLogin = ()=>isLogin(App.userSession);
    this.exitAuth = ()=>unLognin(App.userSession);
    this.App = App;
    this.StorageUse = StorageApp;
  }
  useStorageClass(ClassStorage){
    this.StorageUse = ClassStorage;
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

export class AuthService extends Auth{
  constructor(App){
    super(App);
  }
}