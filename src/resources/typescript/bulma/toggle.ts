import {u} from "../extends/umbrella_extends";
import config from "../config";

export default class toggle{

    constructor(selector,target_selector = "data-toggle-target" , target = "data-toggle"){
        let elements = u(selector);
        let self = this;
    
        elements.each(function(node){
            let element = u(node);
            element.on("click",function(this){
                let ts = u(this).attr(target_selector);
                let t = u("[" + target +"='" + ts + "']");
                if(t.hasClass("is-active")){
                    self.close(element,t)
                    return
                }
                self.open(element,t);
            })
        })        
    }

    private open = (element : umbrellajs.element,target:umbrellajs.element) => {
        element.addClass("is-active");
        target.addClass("is-active");  
    }

    private close = (element : umbrellajs.element,target:umbrellajs.element) => {
        target.removeClass("is-active");
        element.removeClass("is-active");
    }
    
}