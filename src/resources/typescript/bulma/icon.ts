import {u} from "../extends/umbrella_extends";
import config from "../config";

export default class icon {
    private icon : umbrellajs.element;
    private prefix = "fa";
    private container : umbrellajs.element;
    
    constructor( element : Element ){
        this.icon = u(element);
        this.container = this.icon.find("." + this.prefix);
    }

    change = (type) => {
        this.container.each( node =>  {
            let classes = node.classList;
            for(let i = 0 ; i <  classes.length ; i++ ){
                if(classes[i] === "fa"){
                    continue;
                };
                classes.remove(classes[i]); 
            }
            classes.add( "fa-" + type)
        })
    }

    spin = ( action : boolean ) => {
        
        if(action === false){
            this.container.removeClass("fa-spin");
            return;
        }

        if( ! this.container.hasClass("fa-spin") ){
            this.container.addClass("fa-spin");
        }
    }

}