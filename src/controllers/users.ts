
import controller from "../core/controller"
import services from "../services"

export default class users extends controller{
    
    index = async (ctx,next) => {
        await ctx.render('/users/index')
    }
    
    store = async (ctx,next) => {
        await ctx.render('users/index')
    }
    
    show = async (ctx,next) => {
        await ctx.render('users/index')
    }
    
    edit = async (ctx,next) => {
        await ctx.render('users/index')
    }

    update = async (ctx,next) => {
        await ctx.render('users/index')
    }
    
    destory = async (ctx,next) => {
        await ctx.render('users/index')
    }

}