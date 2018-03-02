import {form_element,form_element_error,form_element_state} from "./form_element";

class input_state extends form_element_state{

    get state(){
        return this._state;
    }

    set state(state : string){
        this.typical(state);
    }

}

class input_error extends form_element_error{
    
    get error(){
        return this._error;
    }

    set error(errors : string[]){
        this.typical(errors);
    }

}


export default class input extends form_element{
    
    constructor(element : HTMLInputElement , error_container : HTMLElement){
        super(element);
        this._state = new input_state( this );
        this._error = new input_error(this._state , error_container);
    }
    
    public get value(){
        return this.element.value;
    }

    public set value(value :string){
        this.element.value = value;
    }
    public get error(){
        return this._error.error;
    }

    public set error(errors :string[]){
        this._error.error = errors;
    }
}