import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Person } from '@stacks/profile';
const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

export const nameApp = "SecretsApp"

export const authenticate = f=>{showConnect({
    appDetails: {
        name: nameApp,
        icon: "https://cldup.com/JBYtQaqOZX.svg"
    },
    redirectTo: '/',
    finished: typeof f === "function"?f:_=>window.location.reload(),
    userSession: userSession,
})}

export const getUserData = ()=>userSession.loadUserData();

export const getPerson = ()=>new Person(getUserData().profile);

export const isLogin = ()=>userSession.isUserSignedIn();

export const unlogin = (root)=>userSession.signUserOut(root||"/");