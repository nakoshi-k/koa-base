import * as koa from "koa"
import * as body_parser from 'koa-bodyparser'
import * as render from 'koa-ejs'
import * as serve from 'koa-static'
import * as passport from 'koa-passport'
import * as path from 'path'

const app = new koa()

// read config
import config_mod from "./config"
const config = new config_mod();
app.use( config.middleware );

import security_mod from "./security"
const security = new security_mod(app,config);

app.use( security.session )
app.use( security.csrf )

app.use(body_parser())

import template from './template'
app.use(template);

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
