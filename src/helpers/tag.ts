import {helper} from "../core"

export default class tag extends helper{

    property = (property : {[key:string] : string}) => {
        if(Object.keys(property).length === 0){
            return ""
        }
        let serialize_property = ""
        Object.keys(property).forEach((key) => {
            serialize_property += ` ${key}="${property[key]}"` 
        })
        return serialize_property;
    }

    create = ( tag_name:string , property : {[key:string] : string}  = {}) => {
        let prop = this.property(property);
        return `<${tag_name}${prop}>`
    }

    wrap = ( content :string , tag_name :string , property :  {[key:string] : string} = {}) => {
        return `${this.create(tag_name,property)}${content}${this.create( "/" + tag_name ) }`
    }


}
