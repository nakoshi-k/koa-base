import * as koa from "koa"
import {resource} from './core/resource'
import * as body_parser from 'koa-bodyparser'
import * as render from 'koa-ejs'
import * as serve from 'koa-static'
import * as path from 'path'
const app = new koa()
app.use(body_parser())

//rendering engine
render(app,{
    "root" : path.join( __dirname , 'views'),
    "layout": 'template',
    "viewExt": 'html',
    "cache": false,
    "debug": false 
});

//routing
import route from "./route"
app.use(route.routes())
.use(route.allowedMethods())

//static files define
app.use(serve(__dirname + '/public'));

app.listen(3001);
