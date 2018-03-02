import {u} from "../extends/umbrella_extends";
import form_element_factory from "./form_element_factory";
export default class form_element_node{
    public tree = {};
    public list = {};
    
    private form : umbrellajs.element;
    private factory : form_element_factory;

    constructor(selector){
       this.factory = new form_element_factory();
       this.form = u(selector);
       this.init();
    }

    get inputs(){
        return this.form.find("input,textarea,select");
    }
    
    public init(){
        const inputs = this.inputs;
        const self = this;
        inputs.each(function(node){
            self.append(node);
        })
    }

    public append = (node:HTMLInputElement) => {
        const element = u(node);
        const name = element.attr("name");

        if(name === null ){
            return
        }

        const error =  this.form.find('.input-error[form-errors-for="' + name +'"]')
        let h = name.split(/[\[\]]+/);

        this.list[ name ] = this.factory.create( element.nodes , error.nodes[0] );
        
        if( h.length === 1 ){
            this.tree[ name ] = this.list[ name ]
            return
        }
        h.pop();

        let prev = this.tree;
        for(let i = 0 ; i < h.length ; i++){
            
            if( i === ( h.length - 1 ) ){
                prev[ h[i] ] = this.list[ name ]
                break
            }
            
            if( typeof prev[ h[i] ]  === "undefined" ){
                prev[ h[i] ] = {}
            }
            prev = prev[ h[i] ]
        }
    }

    public update = ( values , tree?) => {
        if(typeof tree === "undefined"){
            tree = this.tree
        }
        for(let k in values){
            if(typeof values[k] === "object"){
                if( typeof tree[k] === "undefined"){
                    continue
                }
                this.update( values[k] , tree[k] )
                continue
            }
            
            if( typeof tree[k] === "undefined"){
                continue
            }

            tree[k].value =  values[k] 
            tree[k].state = ""
            tree[k].error = ""
        }
    }

    public errors = (values , tree?) => {
        if(typeof tree  === "undefined"){
            this.clear_errors()
            tree = this.tree
        }
        for(let k in values){
            if(!Array.isArray(values[k])){
                if( typeof tree[k] === "undefined"){
                    continue;
                }
                this.errors(values[k] , tree[k]);
                continue;
            }

            if( typeof tree[k] === "undefined"){
                continue;
            }
            tree[k].error =  values[k] ;
        }
    }

    public toJSON = ( tree? ) => {
        let JSONData = {}
        if(typeof tree === "undefined"){
            tree = this.tree
        }
        for( let k in tree){
            if(typeof tree[k].value === "undefined" ){
                JSONData[k] = this.toJSON( tree[k] )
                continue
            }
            JSONData[k] = tree[k].value
        }
        return JSONData
    }

    public clear_errors = () => {
        let list = this.list
        for(let k in list){
            list[k].error = "";
        }
    }

}