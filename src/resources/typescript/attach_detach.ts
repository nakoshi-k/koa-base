import {u} from "./extends/umbrella_extends";
import button from "./bulma/button"

interface attach_detach_options{
    prefix : string,
    button : string,
    token : string,
    has : string,
    model : string,
    attach_model : string
    url : {
        attach : string
        detach : string
    }
}

class attach_detach_button extends button{
    give = (has : string) => {
        this.button.addClass("is-primary")
        this.button.attr(has , "yes")
    }
    take = (has : string ) => {
        this.button.removeClass("is-primary")
        this.button.attr(has , "no")
    }
}

export default class attach_detach{

    private to_sanke : (string) =>  string = (str) => {
        return str.toLowerCase().replace(/\-/gi , "_");
    }

    private put_options : (button : button) => RequestInit = (button) => {

        let options : RequestInit = {
            "method": "PATCH",
            "credentials":"same-origin",
            "headers" : {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' ,
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN' :  this.options.token
                }
        
        }
        let opt = this.options;
        let body = {};
        body[ this.to_sanke( opt.model ) ] = button.attr( opt.prefix + opt.model)
        body[ this.to_sanke( opt.attach_model ) ] = button.attr( opt.prefix + opt.attach_model);
        options.body =  JSON.stringify( body );
        return options;
    }
    private options : attach_detach_options;

    constructor(options : attach_detach_options){
        this.options = options
        this.init()
    }

    private init = () => {
        const buttons = u( "[" + this.options.prefix + this.options.button + "]");
        buttons.each(this.toggle);
    }

    private attach  = (button : attach_detach_button ) => {
        fetch(this.options.url.attach , this.put_options(button) ).then( (response) => {
            if(response.status === 200){
                return response.json();
            }
            throw response;
        }).then( (data) => {
            button.give( this.options.prefix + this.options.has);
            button.loading = false;
        } ).catch(e => {

        })
    }

    private detach = (button : attach_detach_button) => {

        fetch(this.options.url.detach , this.put_options(button) ).then( (response) => {
            if(response.status === 200){
                return response.json();
            }
            throw response;
        }).then( (data) => {
            button.take( this.options.prefix + this.options.has);
            button.loading = false;
        } ).catch(e => {

        })
    }

    private toggle = (node : HTMLElement) => {
        const btn = new attach_detach_button(node);
        btn.click = (button : button | attach_detach_button) => {
            let has = button.attr( this.options.prefix + this.options.has );
            button.loading = true;
            if(has === "yes"){
                this.detach(<attach_detach_button>button);
                return;
            }
            this.attach(<attach_detach_button>button);
        }
    }    

}