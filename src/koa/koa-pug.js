const Koa = require('koa')
const path = require('path')
const Pug = require('koa-pug')
const websockify = require('koa-websocket')
const route = require('koa-route')
const mount = require('koa-mount')
const serve = require('koa-static')

const app = websockify(new Koa(), {
  perMessageDeflate: false,
  // maxPayload: 1024 * 1024 * 10,
  // maxBackpressure: 1024 * 1024 * 10,,
  // maxBacklog: 1024 * 1024 * 10,
  // maxExtensions: 1024 * 1024 * 10,
  // maxHeaderPairs: 1024 * 1024 * 10,



  })
const pug = new Pug({
  viewPath: path.resolve(__dirname, '../views'),
  app
})

pug.locals.someKey = 'some value'

app.use(mount('/public', serve(path.resolve(__dirname, '../public'))))
app.use(async ctx => {
  await ctx.render('index2')
})


function IsJsonString(str) {
  try {
    var json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

app.ws.use(function(ctx, next) {
  return next(ctx);
});

// Using routes
app.ws.use(
  
  route.all('/ws', function (ctx) {
  ctx.websocket.send('Hello World');
  ctx.websocket.on('message', (data) => {

      if (typeof data === 'string') {
        return
      }

      const { server } = app.ws

      if(!server){
        return
      }

      server.clients.forEach(client => {
        if (client.readyState === 1) {
          if (IsJsonString(data)) {
            const {message, nickname } = JSON.parse(data)
            client.send(JSON.stringify({message: message, nickname: nickname}));
          }
        }
      })

      
  });
})); 


app.listen(3000)