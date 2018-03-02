import {resource} from './core/resource'
const route = resource.create()


const users = resource.create("users").restful()
route.use("/users" , users.routes() , users.allowedMethods() )

export default route;