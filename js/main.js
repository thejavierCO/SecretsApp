const {AppConfig,UserSession,showConnect} = blockstack;

const appConfig = new AppConfig(['store_write', 'publish_data']);

const userSession = new UserSession({ appConfig });

function authenticate() {
    showConnect({
        appDetails: {
            name: 'Secrets'
        },
        redirectTo: '/',
        finished: () => {
            window.location.reload();
        },
        userSession: userSession,
    });
}

function getUserData() {
  return userSession.loadUserData();
}

function getPerson() {
  return new Person(getUserData().profile);
}

const app = new Vue({
    el:"#app",
    data:{
        text:"hello world"
    },
    methods:{
        authenticate
    }
})