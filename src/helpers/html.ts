import {helper} from "../core"
import tag from "./tag"
export default class html extends helper{
    private tag : tag
    constructor(){
        super()
        this.tag = new tag()
    }

    link = (uri : string , content :string , property : {[key:string] : string} ) => {
        property.href = uri
        return this.tag.wrap(content,"a" , property)
    }

    route_to_uri = (path : string) =>{
        return path
    }

    route_link = ( path : string , content :string , property : {[key:string] : string}) => {
        const uri = this.route_to_uri(path)
        return this.link(uri , content , property )
    }

    div = ( content : string , property : {[key:string] : string}) => {
        return this.tag.wrap(content,"div" , property)
    }

    span = ( content : string , property : {[key:string] : string}) => {
        return this.tag.wrap(content,"span" , property)
    }

}
