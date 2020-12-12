import {storage} from "./storage";

export class Theme{
    constructor(options={target:document.body,name:"dark"}){
        let {target,name} = options;
        this.tag = target;
        this.name = name;
        this._status = this.setStatus(false);
    }
    getStatus(){
        return this._status;
    }
    setStatus(a){
        return this._status = this.save(a);
    }
    save(a){
        return a;
    }
    print(e=this._status){
        if(e)document.body.setAttribute("dark","");
        else document.body.removeAttribute("dark");
    }
}

export class Theme_localStorage extends Theme{
    save(a){
        if(localStorage.getItem(this.name)===null)localStorage.setItem(this.name,a);
        else localStorage.setItem(this.name,a);
        return localStorage.getItem(this.name)===null?this._status:localStorage.getItem(this.name);
    }
}

export class Theme_BlockStack extends Theme{
    save(a){
        console.log(a);
        return a;
    }
}