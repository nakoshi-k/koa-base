import {form_element,form_element_error,form_element_state} from "./form_element";

class radio_state extends form_element_state{

    get state(){
        return this._state;
    }

    set state(state : string){
        this.typical(state);
    }

}

class radio_error extends form_element_error{
    
    get error(){
        return this._error;
    }

    set error(errors : string[]){
        this.typical(errors);
    }

}


export default class radio extends form_element{
    
    constructor(element : HTMLInputElement , error_container : HTMLElement){
        super(element);
        this._state = new radio_state(this);
        this._error = new radio_error(this._state , error_container);
    }
    
    get value() {
        let radio = this.u_element;
        let value = "";
        
        radio.each(function(node){
            if( node.checked ){
                value = node.value;
                return;
            }
        })

        return value;
    }

    set value(value :string){
        let checked = "[value='" + value +"']";
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