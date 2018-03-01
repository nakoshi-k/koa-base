import * as KoaRouter from 'koa-router';
import controllers from "../controllers";

class resource_class{
    public create : KoaRouter = (controller = "") => {
        const router : KoaRouter = new KoaRouter()
        if(controller !== ""){
            router.controller =  new controllers[controller]()
        }
        router.restful = (...middlewares) => { 
            this.restful(...[router,...middlewares , ])
            return router
        };
        return router;
    }

    private restful = (...middlewares) => {
        const router = middlewares.shift();
        if(!router.controller){
            return;
        }
        router.get("/" , ...middlewares , router.controller.index )
        router.post("/" , ...middlewares , router.controller.store )
        router.get("/:id" , ...middlewares , router.controller.show )
        router.get("/:id/edit" , ...middlewares , router.controller.edit)
        router.put ("/:id" , ...middlewares , router.controller.update)
        router.delete("/:id" , ...middlewares , router.controller.destory);
        return router;
    }

}

export const resource = new resource_class();