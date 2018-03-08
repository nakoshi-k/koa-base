import * as session from 'koa-session'
import * as CSRF from 'koa-csrf';

export default class security{

    constructor(app , config){
        app.keys = config.read("secret")
        const session_config =  config.read("session")
        app.use(session(session_config, app))
        app.use( new CSRF( config.read("csrf") ) )
    }

    session = async (ctx , next) => {
        // ignore favicon
        if (ctx.path === '/favicon.ico') {
            return await next()
        } 
        let n = ctx.session.views || 0;
        ctx.session.views = ++n;
        await next()
    }

    csrf =  async (ctx , next ) => {
        ctx.state.csrf = ctx.csrf;
        await next()
    }

}

