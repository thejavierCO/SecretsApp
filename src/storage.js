import {isLogin,userSession} from "./auth";
import {Storage} from "@stacks/storage";
import { v4 } from "uuid";

export const storage = ()=>isLogin()?new ManagerStorage({userSession}):{};

export class File{
    constructor(name,storage){
        if(!name)throw {error:"require name"};
        this.storage = storage;
        this.name = name;
        this._type = "application/json";
    }
    get type(){
        return this._type;
    }
    set type(a){
        this._type = a;
    }
    getContent(){
        return this.storage.getFile(this.name)
        .catch(e=>{throw {error:"not exist file",base:e}});
    }
    setContent(...data){
        return this.storage.putFile(this.name||v4(),data.join("\n"));
    }
    del(){
        this.getContent()
        .then(_=>this.storage.deleteFile(this.name))
        .catch(e=>{throw {error:"not exist file",base:e}})
    }
}

export class ManagerStorage extends Storage{
    initFile(name){
        return new File(name,this);
    }
    set Files(a){
        if(typeof a === "function"){
            return this.listFiles((b)=>a({OK:b}))
            .then((b)=>a({Exit:b}))
            .catch((b)=>a({Err:b}))
        }else if(typeof a === "object"&&!Array.isArray(a)){
            let {OK,Err,Exit} = a;
            return this.listFiles(typeof OK === "function"?OK:"")
            .then(typeof Exit === "function"?Exit:(a)=>a)
            .catch(typeof Err === "function"?Err:(a)=>{throw a})
        }
    }
}