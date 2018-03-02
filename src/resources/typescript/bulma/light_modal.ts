import {u} from "../extends/umbrella_extends";
import config from "../config";
import button from "./button";

interface open_args{
    message : string,
    done_text : string,
    cancel_text : string,
    status : string ,
    done : (modal:light_modal) => {},
    focus? : string,
}

interface options{
    done : string,
    cancel : string,
    close : string,
    message : string
}

export default class light_modal{
    private modal : umbrellajs.element
    private button : {
        done : button,
        cancel : button
    };
    private before_focus : HTMLElement
    private _message : HTMLElement
    private done : (modal) => void = () => {}

    constructor(selector , options : options){
        this.modal = u(selector)
        if(this.modal.length === 0){
            return;
        }
        const done = this.modal.find(options.done)
        const cancel = this.modal.find(options.cancel)
        this.button = {
            done : new button( done.nodes[0] ),
            cancel : new button( cancel.nodes[0] )
        }
        let self = this
        done.on("click" , function(){
            self.done(self);
        });

        this.modal.find(options.close).on("click" , this.close)
        this._message = this.modal.find(options.message).nodes[0]
    }
    
    set message (msg : string){
        this._message.innerHTML = msg;
    }

    public status = (state : string) => {
        this.modal.removeClass(config.statuses);
        if(typeof state === "undefined"){
            return false;
        }
        this.modal.addClass("is-" + state);
        this.modal.addClass("is-" + state);
    }

    
    public clear = () => {
        this.status("primary");
        this.button.done.reset();
        this.button.cancel.reset();
        this.done = (modal) => {};
    }


    public open = ( args : open_args ) => {
        this.done = args.done
        this.before_focus = <HTMLElement>document.activeElement
        this.message = args.message
        this.button.done.text = args.done_text
        this.button.cancel.text = args.cancel_text
        this.active()
        this.focus(args.focus)
        this.status(args.status)
    }

    public focus = ( focusType ) => {
        
        if(typeof focusType === "undefined" || focusType === "cancel"){
            this.button.cancel.focus()
        }

        if(focusType === "done"){
            this.button.done.focus()
        }
    }

    public active = () => {
        this.modal.addClass("is-active")
    }

    public inactive = () => {
        this.modal.removeClass("is-active")
    }
    
    public close = () => {
        this.clear()
        this.inactive()
        this.before_focus.focus()
    }

}
