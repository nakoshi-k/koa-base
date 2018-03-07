import {helper} from "../core"
export default class scripts extends helper{
    private scripts = [];  

    set append(value){
        this.scripts.push(value);
    }

    set prepend(value){
        this.scripts.unshift(value);
    }
    
    read = () => {
        let html = "";
        this.scripts.forEach( (value) => {
            html += value;
        })
        return html;
    }
}