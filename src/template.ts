import * as render from 'koa-ejs'
import * as path from 'path'

const ejs = {
    "root" : path.join( __dirname , 'views'),
    "layout": 'layout',
    "viewExt": 'html',
    "cache": false,
    "debug": false 
};

const template = async ( ctx , next ) => {
    render(ctx.app,ejs);
    await next();
}

export default template;