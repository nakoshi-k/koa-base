import * as koa from "koa"
import {resource} from './core/resource'
import * as body_parser from 'koa-bodyparser'
import * as render from 'koa-ejs'
import * as path from 'path'

const app = new koa()
app.use(body_parser())

render(app,{
    "root" : path.join( __dirname , 'views'),
    "layout": 'template',
    "viewExt": 'html',
    "cache": false,
    "debug": false 
});

const root = resource.create()
const users = resource.create("users").restful()

root.use("/users" , users.routes() , users.allowedMethods() )


app.use(root.routes())
.use(root.allowedMethods())

app.listen(3001);
