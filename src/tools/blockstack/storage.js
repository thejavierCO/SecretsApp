import {Storage} from "@stacks/storage";

function File(name,storage) {
    return {
        name,
        newFile(name){
            let file = File(name,storage);
            return file;
        },
        delete(){
            storage.deleteFile(name)
        },
        get content(){
            try{
                return storage.getFile(name)
            }catch(err){
                throw {error:"not exist",err}
            }
        },
        set content(data){
            if(typeof data === "string")storage.putFile(name,data)
            else throw {error:"require type string"}
        }
    }
}

export class Database extends Storage{
    constructor(options){
        super(options);
    }
    File(...name){return name.map(name=>File(name,this))}
    async Files(){
        let list = [];
        return await this.listFiles(name=>{
            list.push(File(name,this));
            return true
        })
        .then(_=>list)
    }
}