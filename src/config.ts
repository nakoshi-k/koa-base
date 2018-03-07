import * as fs from "fs"
const config = async ( ctx , next ) => {
    const config_filepath = fs.readFileSync( __dirname + "/config/config.json" , "utf8" );
    const config = JSON.parse( config_filepath );
    ctx._config = config
    await next();
}
export default config;