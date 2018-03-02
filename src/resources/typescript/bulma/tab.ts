import {u} from "../extends/umbrella_extends";
import config from "../config";

class tab_container{
    private container : umbrellajs.element;
    constructor(node:Element){
        this.container = u(node);
    }
    public active = () => {
        this.container.addClass("is-active");
    }
    public inactive = () => {
        this.container.removeClass("is-active");
    }
}

export default class tab{
    private parent : umbrellajs.element; 
    private tab : umbrellajs.element;
    private containers:{[prop:string] : tab_container} = {};
    constructor(selector : string){
        this.parent = u(selector);
        this.tab = this.parent.find("li");
        const tag_str = this.parent.attr("data-tab-target")
        const containers = u('[data-tab-container="' + tag_str + '"]');
        
        containers.each((node) =>{
            const container = u(node);
            const key = container.attr("data-tab-content");
            this.containers[ key ] = new tab_container(node);
        })        
        // cancel defalt action
        this.tab.find("a").handle("click" , function(e){});
        const self = this;
        
        this.tab.handle("click" , function(this,e){
            let active = u(this).find("a").attr("href");
            active = active.replace("#" , "");
            self.active(active);
            u(this).addClass("is-active");
            self.tab.not( u(this) ).removeClass("is-active");
        });
    }

    private active = (active:string) => {
        const containers = this.containers;
        for ( let key in containers){
            if( key === active){
                containers[key].active()
                continue
            }
            containers[key].inactive()
        }
    }

}