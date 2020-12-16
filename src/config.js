import moment from "moment";
import { v4 } from "uuid";

let defaultTheme = "white";

export const Themes = ["dark","white"]

export class Theme{
    constructor(tag){
        this.name = tag;
    }
}

export class Auth{
    constructor(options){
        let t = defaultTheme;
        let pages = [];
        if(options){
            let {Theme:theme,_pages,Pages} = options;
            if(typeof theme === "string")t=theme||defaultTheme;
            else if(typeof theme === "object"&&theme.name)t=theme.name||defaultTheme;
            if(pages)pages=Pages||_pages||[];
        }
        this.Theme = Themes.map(e=>new Theme(e)).filter(e=>e.name === t)[0];
        this.Pages = pages;
    }
    delPage(id){
        try{
            return this.Pages = this.Pages.filter(e=>Object.keys(e)[0]!==id);
        }catch(err){
            throw {error:"not exist page",info:err}
        }
    }
    getPage(id){
        try{
            return this.Pages.filter(e=>Object.keys(e)[0]===id)[0][id];
        }catch(err){
            throw {error:"not exist page",info:err}
        }
    }
    setPage(data){
        if(!data)throw {error:"not exist data"}
        let {name,content} = data;
        this._pages.push({[v4()]:{name,content}})
    }
    get Pages(){
        return this._pages;
    }
    set Pages(data){
        if(Array.isArray(data)){
            this._pages = data;
        }else throw {error:"require array"}
    }
}

export class config{
    constructor(...options){
        try{
            let auth = false;
            if(options.length===1){
                let {Auth:a} = options[0];
                auth = a||false;
            }else if(options.length>=1){
                auth = options[0]||false;
            }
            if(typeof theme === "object"||typeof auth === "object"){
                this.Auth = new Auth(auth);
            }else{
                this.Auth = new Auth();
            }
        }catch(err){
            throw {error:"",info:err}
        }finally{
            // this.createAt = moment().toDate()
        }
    }
    use(json){
        try{
            let data = JSON.parse(json);
            Object.keys(data).map(a=>{
                Object.keys(this).map(b=>{
                    if(a===b){
                        if(a==="Auth")this[b] = new Auth(data[a]);
                        else this[b] = data[a];
                    }
                })
            })
            return this;
        }catch(err){
            throw {error:"not is json",info:err}
        }finally{
            this.createAt = moment().toDate();
        }
    }
    get json(){
        return JSON.stringify(this);
    }
}