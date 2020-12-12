import {isLogin} from "./auth";
import {Storage} from "@stacks/storage";

export const storage = ()=>isLogin()?new Storage({userSession}):{};

export class ManagerStorage{
    constructor(storage){
        this.storage = storage;
    }
    set file(a){
        let {name,content} = a;
        if(name&&content){
            console.log(name,content)
        }
    }
}