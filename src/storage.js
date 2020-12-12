import {Storage} from "@stacks/storage";
import {userSession} from "./auth";
import {v4} from "uuid"

export const storage = new Storage({ userSession });

export const setSecret = (data)=>{
    storage.putFile(v4(),JSON.stringify(data),{encrypt:true}).then(e=>{
        console.log(e)
    })
}

export const getSecret = (data)=>{}

export const delSecret = (data)=>{}

export const updateSecret = (data)=>{}

export const getSecrets = (data)=>{}