import {Storage} from "@stacks/storage";
import { v4 } from "uuid";

export class StorageApp extends Storage{
    constructor(userSession){
        super({userSession});
        this.File = (name,type)=>new File(name,type,this);
    }
    get Files(){return this.listFiles}
}

export class File{
    constructor(name,type,storage){
        this.name = name||v4();
        this.type = type||"application/json"
        this.storage = storage;
    }
    get Content(){
        return this.storage.getFile(this.name);
    }
    set Content(data){
        if(typeof data === "string"){
            return this.storage.putFile(this.name,data,{contentType:this.type});
        }else{
            throw {error:"data not is string",data}
        }
    }
    delete(){
        return this.storage.deleteFile(this.name);
    }
}