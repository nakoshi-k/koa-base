import * as koa from "koa"
import {resource} from './core/resource'
import * as body_parser from 'koa-bodyparser'
import * as render from 'koa-ejs'
import * as serve from 'koa-static'
import * as session from 'koa-session'
import * as passport from 'koa-passport'
import * as path from 'path'

const app = new koa()
app.use(body_parser())

//template engine
render(app,{
    "root" : path.join( __dirname , 'views'),
    "layout": 'layout',
    "viewExt": 'html',
    "cache": false,
    "debug": false 
});

// read config
import config from "./config"
app.use(config);

// read helper

import helper from "./helper"
app.use(helper);

//on error
import error from "./error"
app.use(error)

//routing
import route from "./route"
app.use(route.routes()).use( route.allowedMethods() )

//static files define
app.use(serve(__dirname + '/public'));

app.listen(3000);
