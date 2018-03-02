import {u} from "../extends/umbrella_extends";
import config from "../config";
import button from "./button";

class loading{
    private modal : modal;
    private config = config.modal;
    constructor(modal : modal){
        this.modal = modal;
    }

    public start = () => {
        const modal = this.modal;
        modal.transaction = true;
        modal.button.disable();
        modal.button.icon.change(this.config.done.icon.loading);
        modal.button.icon.spin(true);
    }

    public end = (state : string) => {
        const modal = this.modal;
        modal.button.icon.spin(false);
        modal.transaction = false;
        modal.button.enable();

        if(state){
            if(state !== "success"){
                modal.button.state = state;
                modal.button.text = "Error";
            }
            modal.button.icon.change( this.config.done.icon[state] );
            return;
        }
        modal.button.text = "done";
        modal.button.icon.change( this.config.done.icon.base );
    }
}


export default class modal{
    private modal : umbrellajs.element;
    private config = config.modal;
    private _transaction = false;


    get transaction() {
        return this._transaction;
    }
        
    set transaction(state:boolean) {
        this._transaction = state;
    }

    public button:button;
    private loading:loading;
    private _title : HTMLElement;
    private _body : HTMLElement;

    public title = (newTitle : string) => {
        this._title.innerHTML = newTitle;
    }
    
    public body = (newBody : string) => {
        this._body.innerHTML = newBody;
    }

    constructor( selector:string ){
        this.modal = u(selector);
        if(this.modal.length === 0){
            return;
        }
        const btnNode = this.modal.find( "." + this.config.done.class ).nodes[0];
        this.button = new button( btnNode );
        this._title = this.modal.find( "." + this.config.card.title ).nodes[0];
        this._body = this.modal.find( "." + this.config.card.body ).nodes[0];
        this.loading = new loading( this );
        this.modal.find('[aria-label="close"]').on("click",this.close);
    }

    public close : () => void = () => {
        if( this.transaction ) {
            return;
        }
        this.modal.removeClass(this.config.active);
    }

    public open : () => void = () => {
        this.modal.addClass(this.config.active);
    }

    public toggle : () => void = () => {
        if( this.modal.hasClass( this.config.active ) ) {
            this.close();            
            return;
        }
        this.open();      
    }



}
