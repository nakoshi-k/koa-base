import * as KoaRouter from 'koa-router';
import controllers from "../controllers";

class resource{
    public create : (c?) => KoaRouter = (controller = "") => {
        const router = new KoaRouter()
        if(controller !== ""){
            router.c =  new controllers[controller]()
        }
        router.restful = (...middlewares) => { 
            this.restful(...[router,...middlewares , ])
            return router
        };
        return router;
    }

    private restful : (...m) => KoaRouter = (...middlewares) => {
        const router = middlewares.shift();
        if(!router.c){
            return;
        }
        router.get("/" , ...middlewares , router.c.index )
        router.post("/" , ...middlewares , router.c.store )
        router.get("/:id" , ...middlewares , router.c.show )
        router.get("/:id/edit" , ...middlewares , router.c.edit)
        router.put ("/:id" , ...middlewares , router.c.update)
        router.delete("/:id" , ...middlewares , router.c.destory);
        return router;
    }

}
const instance = new resource();
export default instance