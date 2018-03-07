import * as helpers from "./helpers"
import { helper } from "./core"

export default async (ctx, next) => {
    let helper : { [prop:string] : helper} = {};
    helper.scripts = new helpers.scripts()
    helper.profile = new helpers.profile()
    ctx.state._h = helper
    await next();       
}
