import {helper} from "../core"
import * as fs from "fs"
import * as path from "path"

export default class profile extends helper{
    constructor(){
        super()
        const config_file_path = path.resolve(__dirname + "/../config/site.json")
        const config = fs.readFileSync( config_file_path , "utf8" );
        const site = JSON.parse( config );
        return site;
    }
}
