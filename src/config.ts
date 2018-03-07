import * as fs from "fs"
const config = async ( ctx , next ) => {
    const config = fs.readFileSync( __dirname + "/config/site.json" , "utf8" );
    const site = JSON.parse( config );
    ctx.state.site = site
    await next();
}
export default config;