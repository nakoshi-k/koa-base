import "fetch-polyfill";
import * as base_choices from "choices.js";
import {u} from "../extends/umbrella_extends";

class choices_ajax{

    private token = () => {
        return u("[name='csrf-token']").attr("content");
    }

    private headers = () => {
        return {
            'X-Requested-With': 'XMLHttpRequest' ,
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN' :  this.token()
        };
    }

    private options : () => RequestInit = () => {
        return {"method": "get",
        "credentials":"same-origin",
        "headers" : this.headers()
        }
    }

    
    private _url = "";
    private _input = "";

    private url(){
        return this._url.replace(/\{input\}/gi ,this._input );
    }

    private choice;
    private loading = false;
  
    private ajax(){

        if(this.loading === true){
            return;
        }
        this.loading = true;

        if(this._input.length <  this.min ){
            this.loading = false
            return;
        }

        this.choice.clearStore();
        this.choice.ajax( callback => {
            fetch( this.url() ,this.options())
            .then(response => {
              response.json().then( data => {
                callback(data , "value" , "label");
              });
              this.loading = false;
            })
            .catch(error => {
              this.loading = false;
            });
        });
    }
    private min = -1;
    private init = [];

    constructor(choice,url , min = -1 ){
        this.choice  = choice;
        this.init = this.choice.getValue() ;
        this._url = url;
        this.min = min;
        this.ajax();
    }
    public observer;
    public search = (event) => {
        this._input = "";
        if( event.detail.value ){
            this._input = event.detail.value;
        }
        clearTimeout(this.observer);
        this.observer = null;
        this.observer = setTimeout(() => { this.ajax() },500);
    }   

}

export default class choices{

    private options  = () => {
        return {
            removeItems: true,
            removeItemButton : true,
            noChoicesText : "選択肢が存在しません" ,
            noResultsText : "結果が存在しません",
            itemSelectText : "選択",
            loadingText : "読み込み中"
        }
    }

    constructor(selector){
        u(selector).each( node => {
            let source_url =  u(node).attr("data-choice-url");
            let min : any = ( u(node).attr("data-choice-min") === null) ? 0 : u(node).attr("data-choice-min");
            let opt = this.options();
            if(source_url !== null ){
                opt["noResultsText"] = "存在しないか、読込待ちです";
                opt["noChoicesText"] = "キーワードを入力後に選択肢が表示されます";
                if(min > 0){
                    opt["searchPlaceholderValue"] = "最低" + min + "文字以上入力してください";
                }
            }
            let choices = new base_choices( node , opt );
            if(source_url){
                let ajax = new choices_ajax( choices , source_url , min );
                node.addEventListener( "search" , ajax.search)
            }
        })
    }

}