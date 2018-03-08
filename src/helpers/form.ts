import {helper} from "../core"
import tag from "./tag"

class model{
    private data : {[key : string] : string}
    constructor(data){
        this.data = data
    }
    field = (name , content) => {
        if(content){
            this.data.name = content
        }
        if(!this.data.name){
            return ""
        }
        return this.data.name
    }
}

class form{
    private _model = new model({});
    private tag = new tag();

    input = (name : string ) =>{

    }

    text = (name : string) => {

    }
    
    number = (name : string) => {

    }

    textarea = ( name : string ) => {

    }

    open = () => {

    }

    model = ( data : {[key:string] : string}  ) => {
        this._model = new model(data);
        return this.open()
    }
    
    close = () => {
        return this.tag.create("/form");
    }
}

