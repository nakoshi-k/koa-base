import {u} from "./extends/umbrella_extends";

export default class flush{
    private flush:umbrellajs.element;

    constructor(selector){
        this.flush = u(selector)
        const body = u("body");
        body.one("click" , this.close);
        window.addEventListener('scroll',this.scroll);
        setTimeout(this.remove ,2000);
    }
    
    private remove = () =>  {
        this.flush.remove();
    }

    public close  = () => {
        this.flush.addClass("flush-remove");
        setTimeout(this.remove ,2000);
    }

    public scroll = () => {
        this.close();
        window.removeEventListener("scroll" , this.scroll);
    }


}
