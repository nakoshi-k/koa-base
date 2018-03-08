import {resource} from './core'

const route = resource.create()
const users = resource.create("users").restful()

route.use("/users" , users.routes() , users.allowedMethods() )

//home 
route.get("/" , async (ctx , next) => {
    await ctx.render("home")
})

export default route;