import {u} from "../extends/umbrella_extends";
import config from "../config";

export abstract class form_element{

    protected _state:form_element_state;
    protected _error:form_element_error;

    constructor(element : HTMLInputElement){
        this.u_element = u(element);
        this.element = element;
    }

    get state(){
        return this._state.state
    }
    
    set state( value : string ){
        this._state.state = value;
    }
    
    get error(){
        return this._error.error
    }
    
    set error( errors : string[] ){
        this._error.error = errors;
    }

    abstract get value() : string | string[]
    abstract set value( value : string | string[] )
    public u_element:umbrellajs.element
    public element:HTMLInputElement
    
}

export abstract class form_element_state{
    protected _state:string
    
    protected form_element : form_element
    
    constructor(form_element : form_element){
        this.form_element = form_element
    }
    
    abstract get state() : string ;
    abstract set state(state : string);

    protected typical(state : string){
        
        this.form_element.u_element.removeClass(config.statuses);
        
        if(typeof status === "undefined"){
            return;
        }
        console.log(state);
        if( state !== ""){
            this.form_element.u_element.addClass( "is-" + state);
        }
    }

}

export abstract class form_element_error{
    protected _error  : string[]
    protected _state : form_element_state;
    protected container : HTMLElement;
    constructor(state : form_element_state , error_container : HTMLElement){
        this._state = state
        if(!error_container){
            error_container = document.createElement("div");
        }       
        this.container = error_container;
    }
    
    get state(){
        return this._state.state;
    }
    
    set state(value : string){
        this._state.state = value;
    }

    abstract get error():string[]
    abstract set error(error : string[])
    protected typical(errors : string[] | string){
        let contain = "";
        for(let i = 0 ; i < errors.length ; i++){
            contain += '<div class="help is-danger">* ' + errors[i] + '</div>';
        }
        this.container.innerHTML = contain;
        if( errors !== "" ){
            this.state = "danger";
            return;
        }
        this.state = ""
    }
}

