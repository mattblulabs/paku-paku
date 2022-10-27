import Koa, { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import { createPacApiWrapper, parseSearchApiOptions } from './pacApiWrapper';

const app = new Koa();


async function usePacHost(pacHost: string, ctx: ParameterizedContext<DefaultState, DefaultContext, any>) {
    ctx.body = await createPacApiWrapper({ pacHost }).search(parseSearchApiOptions(ctx.query))
}

app.use(async function (ctx) {
    const responseData = {}
    if (typeof ctx.query.pacHost === 'string') {
        return await usePacHost(ctx.query.pacHost, ctx)
    }
    ctx.status = 400
    ctx.body = {
        message: "invalid or no pac host provided"
    }
})



app.listen(8086)