import * as Koa from "koa"
import {resource} from './core/resource'
import * as bodyParser from 'koa-bodyparser'
import * as render from 'koa-ejs'
import * as path from 'path'

const app = new Koa()
app.use(bodyParser())

render(app,{
    "root" : path.join( __dirname , 'views'),
    "layout": 'template',
    "viewExt": 'html',
    "cache": false,
    "debug": false 
});

const root = resource.create()
const users = resource.create("users").restful()
users.get( "/test" , users.c.index );

root.use("/users" , users.routes() , users.allowedMethods())


app.use(root.routes())
.use(root.allowedMethods())

app.listen(3001);
