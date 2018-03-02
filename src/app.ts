import * as koa from "koa"
import {resource} from './core/resource'
import * as body_parser from 'koa-bodyparser'
import * as render from 'koa-ejs'
import * as serve from 'koa-static'
import * as path from 'path'
const app = new koa()
app.use(body_parser())
import * as fs from "fs"


//template engine
render(app,{
    "root" : path.join( __dirname , 'views'),
    "layout": 'template',
    "viewExt": 'html',
    "cache": false,
    "debug": false 
});

app.use(async ( ctx , next ) => {
    const site = JSON.parse( fs.readFileSync( __dirname + "/config/site.json" , "utf8" ) );
    ctx.state.site = site
    await next();
})

//on error
app.use(async (ctx, next) => {
    try {
      await next();
      if(ctx.status === 404){
        ctx.state.error = {
            "state" : ctx.status,
            "title" : "Not Found",
            "message" : "your request contents is not on the server"
        }
        await ctx.render('error');
      };
    } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.state.error = {
            "state" : ctx.status,
            "title" : "Error",
            "message" : "internal server error"
        }
        await ctx.render('error');
    }
})

//routing
import route from "./route"
app.use(route.routes()).use(route.allowedMethods() )

//static files define
app.use(serve(__dirname + '/public'));

app.listen(3000);
