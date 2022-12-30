// @ts-check
const koa = require('koa');
const app = new koa();


app.use(async (ctx, next) => {
  ctx.body = 'Hello World2';
  await next()
});

app.use(async (ctx) => {
  ctx.body = 'Hello World4';
});

app.listen(3000);