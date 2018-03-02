declare namespace umbrellajs {

    interface eachCallback{
        ( this : HTMLElement , node : HTMLElement & HTMLOptionElement & HTMLInputElement ) : void
    }

    interface eventCallback{
        (e) : void
    }

    interface element{
        parent() : element
        is(selector) : boolean;
        each( callback : eachCallback) : void
        one( event : string , callback : eventCallback) : void,
        on( event : string  , callback : eventCallback),
        off (event:string , callback : eventCallback ) : void;
        removeClass( classNames : any ) : void,
        addClass(classNames : any) : void;
        find(selector) : element;
        html(str : string) : void;
        attr(attribute:string , value? : string) : string;
        removeAttr(attribute : any ) : void;
        hasClass(selector : string ) : boolean;
        nodes : HTMLElement & HTMLInputElement[];
        filter(selector) :element;
        not(selector) :element;
        handle(event:string , callback : eventCallback  ) : void
        remove():void,
        append(element : element):void,
        prepend(element : element):void,
        length : number
    }
}

declare module "umbrellajs" {
    function u(selector:any) : umbrellajs.element
    function ajax() : any
}