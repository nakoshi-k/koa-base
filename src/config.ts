import * as fs from "fs"


export default class config{
    private data;
    constructor(file_path? : string){
        if(!file_path){
            file_path =  __dirname + "/config/config.json"
        }
        const tx = fs.readFileSync( file_path , "utf8" );
        this.data = JSON.parse( tx );
    }

    read = (key) => {
        return this.data[key]
    }

    middleware = async ( ctx , next ) => {
        ctx._config = this.data
        await next();
    }
};