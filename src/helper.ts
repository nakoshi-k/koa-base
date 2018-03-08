import * as helpers from "./helpers"
import { helper } from "./core"

export default async (ctx, next) => {
    let helper : { [prop:string] : helper} = {};
    const blocks : helpers.blocks = new helpers.blocks()
    helper.blocks = blocks
    helper.scripts = blocks.area("scripts")
    helper.profile = new helpers.profile(ctx._config.profile)
    ctx.state._h = helper
    await next()      
}
