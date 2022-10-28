import Koa, { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import Router from '@koa/router';
import { createPacApiWrapper, parseSearchApiOptions } from './pacApiWrapper';
import { createDataComponent, Index, renderTemplate } from './templates';

const paku = new Koa();
const router = new Router();

async function usePacHost(pacHost: string, ctx: ParameterizedContext<DefaultState, DefaultContext, any>) {
    return await createPacApiWrapper({ pacHost }).search(parseSearchApiOptions(ctx.query));
}



router.get('/', async function (ctx) {
    if (typeof ctx.query.pacHost === 'string') {
        ctx.body = renderTemplate(createDataComponent(await usePacHost(ctx.query.pacHost, ctx)));
    } else {
        ctx.body = renderTemplate(Index);
    }
})

router.get('/api', async function (ctx) {
    if (typeof ctx.query.pacHost === 'string') {
        ctx.body = await usePacHost(ctx.query.pacHost, ctx);
    } else {
        ctx.status = 400;
        ctx.body = {
            message: "invalid or no pac host provided"
        };
    }

})


paku.use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT || 8086);