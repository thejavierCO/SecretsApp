import {Storage} from "@stacks/storage";
import {userSession} from "./auth";
import {v4} from "uuid"

export const storage = new Storage({ userSession });

export class DataManager{
    constructor(storage){
        this.database = storage;
    }
    set all(a){
        if(typeof a === "function"){
            storage.listFiles((b)=>{a({OK:b});return true})
            .then(e=>{a({Exit:e});})
            .catch(e=>{a({Err:e});})
        }else if(typeof a === "object"&&!Array.isArray(a)){
            let {OK,Err,Exit} = a;
            storage.listFiles(a=>{OK?OK(a):"";return true})
            .then(e=>Exit?Exit(e):e)
            .catch(e=>Err?Err(e):((a)=>{throw a})(e))
        }
    }
    async del(a){
        this.database.deleteFile(a)
    }
    set add(a){
        let {name,content,OK,Error} = a;
        if(name&&content){
            this.database.putFile(name,content)
            .then(e=>typeof OK === "function"?OK(e):e)
            .catch(e=>typeof Error === "function"?Error(e):e)
            .then(e=>{
                console.log(e)
            })
        }
    }
}

export const setSecret = (data)=>{
    let id = v4();
    storage.putFile(id,JSON.stringify(data),{encrypt:true}).then(e=>{
        console.log(e,id)
    })
}

export const getSecret = (data)=>{}

export const delSecret = (data)=>{}

export const updateSecret = (data)=>{}

export const getSecrets = (data)=>{}