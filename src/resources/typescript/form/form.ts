import {u} from "../extends/umbrella_extends";
import config from "../config";
import button from "../bulma/button";
import form_element_node from "./form_element_node";


class lock{
    private form:umbrellajs.element;
    private lock_container:umbrellajs.element;
    private init = () => {
        const spinner = u('<div>');
        spinner.addClass(["spinner" , "loading"]);
        for(let i = 1 ;i < 6 ; i++ ){
            let rect = u("<div>");
            rect.addClass("rect" + i );
            spinner.append(rect);
        }
        this.lock_container = u("<div>")
        this.lock_container.addClass("form-lock")
        this.lock_container.append(spinner);
        this.form.append( this.lock_container );
    }
    constructor(form:HTMLElement){
        this.form = u(form)
        this.init();
    }
    private before_focus:HTMLElement;

    public lock = () =>{
        this.lock_container.addClass("is-active")
        this.before_focus = <HTMLElement>document.activeElement;
        this.before_focus.blur();
    }

    public unlock = () => {
        this.lock_container.removeClass("is-active")
        this.before_focus.focus();
    }
}

export default class form{
    
    private form : umbrellajs.element;
    private _lock : lock;
    private _node:form_element_node;
    private button : {submit : button};
    constructor( selector , options : { submit : (form) => any } ){
        this.form = u(selector);
        this._lock = new lock( this.form.nodes[0] );
        this._node = new form_element_node( selector );
        this._node.inputs.on("change" , this.update_input );

        this.button = {
            submit : new button(  this.form.find("button[type='submit']").nodes[0] ) 
        }

        if(options.submit){
            this.submit = options.submit;
        }
        this.button.submit.disable();
        this.form.handle( "submit" ,this.submit_handle);

    }

    public lock  = () => {
        this._lock.lock();
    }

    public unlock  = () => {
        this._lock.unlock();
    }
    
    public submit = (form) => {
        
    }

    public submit_handle = () => {
        if( this.dirty ){
            this.lock();
            this.submit(this);
        }
    }

    public update_input = () => {
        this.dirty = true;
        this.button.submit.enable();
        this.button.submit.state = "primary";
        this.button.submit.icon.change("floppy-o");
    }

    private _dirty:boolean;

    get dirty(){
        return this._dirty;
    }
    
    set dirty(status : boolean){
        this._dirty = status;
    }


    public toJSON = () => {
        return this._node.toJSON();
    }
    
    get method(){
        if(typeof this._node.tree["_method"] === "undefined"){
            return this.form.attr("method");
        }
        return this._node.tree["_method"].value;
    }
    
    set method(value : string){
        if(value.toLowerCase() == "get"){
            this.form.attr("method" , "GET");
        }else{
            this.form.attr("method" , "POST");
        }
        
        if(typeof this._node.tree["_method"] === "undefined"){
            let _method = u('<input name="_method" value="" type="hidden">');
            this.form.prepend( _method );
            this._node.append( _method.nodes[0] );
        }

        this._node.update({"_method" : value });
    }

    get action(){
        return this.form.attr("action");
    }

    set action( value : string){
        this.form.attr("action"  , value );
    }

    public bind = (values) => {
        this._node.update(values)
    }

    public bind_errors = (values) => {
        this._node.errors(values) 
    }

    get token(){
        if(this._node.tree["_token"]){
            return this._node.tree["_token"].value;
        }
        let page_token = u("[name='csrf-token']").attr("content");
        if(page_token){
            return page_token;
        }
        return "";
    }

    public post_options = () => {
        return {
            "method": "post",
            "credentials":"same-origin",
            "headers" : {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' ,
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN' :  this.token,
            }
        }
    }

    public success = () => {
        this.dirty = false;
        this.button.submit.disable();
        this.button.submit.loading = false;
        this.unlock();
    }

    public error = () => {
        this.button.submit.loading = false;
        this.button.submit.state ="danger";
        this.unlock();
    }

}