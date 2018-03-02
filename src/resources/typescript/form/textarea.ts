import {form_element,form_element_error,form_element_state} from "./form_element";

class textarea_state extends form_element_state{

    get state(){
        return this._state;
    }

    set state(state : string){
        this.typical(state);
    }

}

class textarea_error extends form_element_error{
    
    get error(){
        return this._error;
    }

    set error(errors : string[]){
        this.typical;
    }

}


export default class input extends form_element{
    
    constructor(element : HTMLInputElement , error_container : HTMLElement){
        super(element);
        this._state = new textarea_state(this);
        this._error = new textarea_error(this._state , error_container);
    }
    
    get value(){
        return this.element[0].innerHTML;
    }

    set value(value :string){
        this.element[0].innerHTML = value;
    }
    
    get error(){
        return this._error.error;
    }

    set error(errors :string[]){
        this._error.error = errors;
    }
}