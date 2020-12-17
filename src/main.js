import "./css/style.scss";
import {Service} from "./tools/app";
import {TwoFactorAuthenticate} from "./tools/2fa"

const config = new Service();
const app = config.makeApp("SecretsApp","https://cldup.com/JBYtQaqOZX.svg");

