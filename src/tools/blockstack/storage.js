import {Storage} from "@stacks/storage";

function File(name) {
    console.log(name);
}

export class Database extends Storage{
    constructor(options){
        super(options);
    }
    File(name){
        return File(name,this)
    }
    async Files(){
        let list = [];
        return await this.listFiles(name=>{list.push(name);return true})
        .then(_=>list)
    }
}