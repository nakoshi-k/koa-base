import {form_element,form_element_error,form_element_state} from "./form_element";

class checkbox_state extends form_element_state{

    get state(){
        return this._state;
    }

    set state(state : string){
        this.typical(state);
    }

}

class checkbox_error extends form_element_error{
    
    get error(){
        return this._error;
    }

    set error(errors : string[]){
        this.typical(errors);
    }

}


export default class checkbox extends form_element{
    
    constructor(element : HTMLInputElement , error_container : HTMLElement){
        super(element);
        this._state = new checkbox_state(this);
        this._error = new checkbox_error(this._state , error_container);
    }
    
    get value() {
        let checkbox = this.u_element;
        let checked :string[] = [];
        checkbox.each(function(node){
            if( node.checked ){
                checked.push(node.value);
            }
        })
        if(checked.length === 0){
            return "";
        }
        if(checked.length === 1){
            return checked[0];
        }
        return checked;
    }

    set value(value :string | string[]){
        let checked = "";
        if(Array.isArray(value)){
            for(let i = 0; i < value.length ;i++){
                checked += "[value='" + value[i] +"'],"
            }
            checked = checked.replace(/,$/,"");
        }else{
            checked = "[value='" + value +"']";
        }
        this.u_element.removeAttr("checked");
        this.u_element.filter(checked).attr("checked","checked");
    }
    get error(){
        return this._error.error;
    }

    set error(errors :string[]){
        this._error.error = errors;
    }
}