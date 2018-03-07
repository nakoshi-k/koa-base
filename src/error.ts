const error = async (ctx, next) => {
    try {
      await next();
      if(ctx.status === 404){
        ctx.state.error = {
            "state" : ctx.status,
            "title" : "Not Found",
            "message" : "your request content is not on the server"
        }
        await ctx.render('error')
      };
    } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.state.error = {
            "state" : ctx.status,
            "title" : "Error",
            "message" : "internal server error"
        }
        await ctx.render('error')
    }
}
export default error