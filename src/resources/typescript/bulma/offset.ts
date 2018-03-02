import {u} from "../extends/umbrella_extends";
import config from "../config";
import cookie from "../cookie_monster";
import cookie_monster from "../cookie_monster";
export default class offset{
    private offset : umbrellajs.element;
    private id : string;
    private main : umbrellajs.element;
    private burger:umbrellajs.element;
    private cookie : cookie;

    constructor(offset : string,main : string , cookie : cookie){
        this.offset = u(offset)
        this.main = u(main)
        this.burger = this.offset.find(".burger")
        this.cookie = cookie;

        if(this.offset.attr("id") !== "" ){
            this.id = this.offset.attr("id");
        }

        let toggle = this.offset.find(".offset-toggle")
        toggle.on("click" , () => {
            if(this.state){
                this.close();
                return
            }
            this.open();
        })
        if(this.cookie.get("offset." + this.id ) ){
            this.open();
        }
    }

    get state(){
        return this.offset.hasClass("is-active");
    }

    public open = () => {
        this.offset.addClass("is-active"); 
        this.main.addClass("is-offset-active");
        this.burger.addClass("is-active");
        this.memory = true;
    }

    public close = () => {
        this.offset.removeClass("is-active"); 
        this.main.removeClass("is-offset-active"); 
        this.burger.removeClass("is-active");
        this.memory = false;
    }
    
    set memory( state:boolean ){
        if(this.cookie && this.id){
            let e = { offset : {} };
            e.offset[this.id] = state;
            this.cookie.set(e);
        }
    }
    
}