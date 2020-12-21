export class Model{
    constructor(){
        this._dependencies = [];
        this._data = [];
        this._control = {data,dependency}
    }
    controlUse(name,data){
        if(/(class)/.test(data.toString())){
            if(name==="data"){
                this._control.data = data;
            }else if(name==="dependency"){
                this._control.dependency = data;
            }else{
                throw {error:"not exist element in control"}
            }
        }else{
            throw {error:"require class"}
        }
    }
    set(name,setdata){
        let {data:ctlData} = this._control
        let base = this._data.filter(e=>e.name===name);
        if(base.length>0){
            console.log("exist")
        }else{
            this._data.push(new ctlData(name,setdata))
        }
    }
    use(name,classUse){
        let {dependency:ctlData} = this._control
        let base = this._dependencies.filter(e=>e.name===name);
        if(base.length>0){
            console.log("exist")
        }else{
            this._dependencies.push(new ctlData(name,classUse))
        }
    }
}
export class dependency{
    constructor(name,data){
        this.name = name;
        this.data = data;
    }
}
export class data{
    constructor(name,data){
        this.name = name;
        this.data = data;
    }
}