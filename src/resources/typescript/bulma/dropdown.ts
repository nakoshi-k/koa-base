import {u} from "../extends/umbrella_extends";
import config from "../config";

export default class dropdown{
    constructor(selector){
        let drop_container = u(selector);
        if(drop_container.length === 0){
            return;
        }
        let self = this;
        drop_container.on("click",function(this){
            self.open(u(this))
        })
    }
    private open = (element : umbrellajs.element) => {
        let active_class = "is-active"
        if(element.hasClass(active_class)){
            element.removeClass(active_class)
            return
        }
        element.addClass(active_class);
        element.one("mouseleave" , function(){
            element.removeClass(active_class)
        })
    }
}