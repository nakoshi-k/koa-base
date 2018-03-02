import { u as base_u , ajax as base_ajax } from "umbrellajs";

base_u.prototype.ancestors = function(selector , first){
    let parent  = base_u(this).parent();
    let ancestors : umbrellajs.element[] = [];
    if(parent.is(selector)){
        if(first){
            return parent[0];
        }
        ancestors.push(parent);
    }
    let has_parent = true;
    while(has_parent){
        if(parent.parent().is(selector)){
            if(first){
                return parent.parent();
            }
            ancestors.push( parent.parent() );
        }
        if( parent.is("body") ){
            has_parent = false;
        };
        parent = parent.parent();
    }
    return ancestors;
};

base_u.prototype.removeAttr = function(attributes : string[]){
    
    if(typeof attributes === "string"){
        attributes = [ attributes ];
    }
    let _this = this;
    attributes.forEach(function(attribute){
        base_u(_this).each(function(node){
            node.removeAttribute( attribute );
        })
    })

}

base_u.prototype.one = function(event , callback){
    let self = base_u(this);
    const call = callback;
    const one = function(e){
        call(e);
        self.off( event , one);
    }

    self.on( event , one );
}

export const u = base_u;
export const ajax = base_ajax;
