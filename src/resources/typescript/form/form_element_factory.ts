import checkbox from "./checkbox";
import select from "./select";
import input from "./input";
import radio from "./radio";
import textarea from "./textarea";

export default class form_element_factory{
    public create(element : HTMLInputElement[] , error_container : HTMLElement){
        let tag = element[0].tagName.toLowerCase();
        let type :string = <string>element[0].getAttribute("type") ;

        const container = {
            checkbox : checkbox,
            select : select,
            radio : radio,
            textarea : textarea
        }

        if( container[tag]){
            return new container[tag](element, error_container);
        }
        
        if( container[type]){
            return new container[type](element, error_container);
        }
        
        return new input(element[0] , error_container);
    }
}
