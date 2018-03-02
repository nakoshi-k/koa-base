import {form_element,form_element_error,form_element_state} from "./form_element";

class select_state extends form_element_state{

    get state(){
        return this._state;
    }

    set state(state : string){
        this.typical(state);
    }

}

class select_error extends form_element_error{
    
    get error(){
        return this._error;
    }

    set error(errors : string[]){
        this.typical(errors);
    }

}


export default class select extends form_element{
    
    constructor(element : HTMLInputElement , error_container : HTMLElement){
        super(element);
        this._state = new select_state(this);
        this._error = new select_error(this._state , error_container);
    }
    
    get value() {
        let options = this.u_element.find("option");
        let multiple = this.u_element.attr("multiple");
        let selected : string[] = [];
        options.each(function(node){
            if( node.selected ){
                let val = node.value;
                selected.push(val);
            }
        })
        if( multiple === null ){
            return  selected[0];
        }
        return selected;  
    }

    set value(value :string | string[]){
        let select = "";
        if(Array.isArray(value)){
            for(let i = 0; i < value.length ;i++){
                select += "[value='" + value[i] +"'],"
            }
            select = select.replace(/,$/,"");
        }else{
            select = "[value='" + value +"']";
        }
        this.u_element.find("option").removeAttr("selected");
        this.u_element.find("option").filter(select).attr("selected" , "selected");
    }
    get error(){
        return this._error.error;
    }

    set error(errors :string[]){
        this._error.error = errors;
    }
}