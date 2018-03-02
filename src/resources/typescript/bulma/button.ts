import {u} from "../extends/umbrella_extends";
import config from "../config";
import icon from "./icon";
export default class button{
    protected button : umbrellajs.element;
    private element : HTMLElement;
    public icon : icon;

    public initial : {
        text : string,
        className : string
    };

    public attr = (attrName) => {
        return this.button.attr(attrName)
    }
    
    public textNode:HTMLElement;

    constructor( element : HTMLElement ){
        this.button = u(element)
        if(this.button.length === 0 ){
            return;
        }
        this.element= element;
        const inner_icon = this.button.find(".icon")
        inner_icon.each( node  => {
            this.icon = new icon(node);
            return;
        })

        this.textNode = document.createElement('span');

        if(this.button.find(".text").nodes[0]){
            this.textNode = this.button.find(".text").nodes[0];
        }

        this.initial = {
            text : this.textNode.innerHTML,
            className : this.button.nodes[0].className
        };

        this.button.on("click" , () => {
            this.click(this);
        });

    }
    /*
    public status = (status : string) => {
        this.button.removeClass(config.statuses);
        this.button.addClass(config.prefix + status);
    }
    */
    private _state = "";
    private change_state = () => {
        this.button.removeClass(config.statuses);
        if(this._state !== ""){
            this.button.addClass(config.prefix + this._state);
        }
    }
    
    get state(){
        return this._state;
    }

    set state(state : string){
        this._state = state;
        this.change_state();
    }


    set text (text : string) {
        this.textNode.innerHTML = text;
    }

    public disable = () => {
        this.button.attr( "disabled" , "disabled" );
        this.state = "";
    }

    public enable = () => {
        this.button.removeAttr("disabled");
        this.state = "primary";
    }

    public reset = () => {
        this.text = this.initial.text;
        this.button.nodes[0].className = this.initial.className;
    }

    public focus = () => {
        this.element.focus();
    }

    public click = (button) => {

    }

    set loading(state :boolean){
        if(!state){
            this.button.removeClass("is-loading");
            return
        }
        this.button.addClass("is-loading");
    } 
}