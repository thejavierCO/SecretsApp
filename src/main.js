import "./css/style.scss";
import {Service} from "./tools/app";

const config = new Service();
const app = config.makeApp("SecretsApp","https://cldup.com/JBYtQaqOZX.svg");

console.log(app)
