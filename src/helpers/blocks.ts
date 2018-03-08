import {helper} from "../core"

export class block{
    private block = [];  

    append = (value) => {
        console.log(value);
        this.block.push(value)
    }

    prepend = (value) => {
        this.block.unshift(value)
    }

    read = () => {
        let html = ""
        this.block.forEach( (value) => {
            html += value
        })
        return html
    }
}

export default class blocks extends helper{
    
    private blocks : { [prop:string] : block} = {};
    
    area = (name) => {
        if(!this.blocks.name){
            this.blocks.name = new block()
        }
        return this.blocks.name
    }

    read = (name) => {
        return this.blocks.name.read()
    }

}