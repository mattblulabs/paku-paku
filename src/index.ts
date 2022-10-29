import Koa, { ParameterizedContext, DefaultState, DefaultContext } from 'koa';
import Router from '@koa/router';
import { createPacApiWrapper } from './pacApiWrapper';
import { createDataComponent, renderTemplate, Search } from './templates';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path'

const paku = new Koa();
const router = new Router();

function usePacHost(ctx: ParameterizedContext<DefaultState, DefaultContext, any>) {
    if (typeof ctx.query.pacHost === 'string' && ctx.query.pacHost.length) {
        return createPacApiWrapper(ctx.query.pacHost)
    }
}

router.redirect('/', '/search');

router.get('/styles.css', async function (ctx) {
    ctx.body = await (await readFile(join(__dirname, '../styles.css'))).toString();
    ctx.set('Content-Type', 'text/css');
})

router.get('/search', async function (ctx) {
    const api = usePacHost(ctx);
    if (api) {
        ctx.body = renderTemplate(createDataComponent(await api.search(ctx.query)));
    } else {
        ctx.body = renderTemplate(Search);
    }
})

router.get('/api/search', async function (ctx) {
    const api = usePacHost(ctx);
    if (api) {
        ctx.body = await api.search(ctx.query);
    } else {
        ctx.status = 400
        ctx.body = {
            message: "No or invalid PAC Host"
        }
    }
})


paku.use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT || 8086);