const Koa = require('koa')
const path = require('path')
const Pug = require('koa-pug')
const websockify = require('koa-websocket')
const route = require('koa-route')
const mount = require('koa-mount')
const serve = require('koa-static')

const mongoClient = require('./mongo')


const app = websockify(new Koa(), {
  perMessageDeflate: false,
  })
const pug = new Pug({
  viewPath: path.resolve(__dirname, '../views'),
  app
})

pug.locals.someKey = 'some value'

app.use(mount('/public', serve(path.resolve(__dirname, '../public'))))
app.use(async ctx => {
  await ctx.render('chat')
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


const _client = mongoClient.connect()

async function getChatCollection() {
  const c = await _client
  return c.db('fc21').collection('chat')
}



// Using routes
app.ws.use(
  
  route.all('/ws', async (ctx) => {
  ctx.websocket.send('Hello World');
  ctx.websocket.on('message', async (data) => {

      if (typeof data === 'string') return

      const { server } = app.ws
      if(!server) return

      const chatCollection = await getChatCollection()
      const chats = await chatCollection.find({}, {
        sort: {
          createdAt: 1
        }
      }).toArray()

      ctx.websocket.send(JSON.stringify({
        type: 'init',
        payload: chats
      }))



      server.clients.forEach(client => {
        if (client.readyState === 1) {
          if (IsJsonString(data)) {

            const chat = JSON.parse(data)

            chatCollection.insertOne({
              ...chat,
              createdAt: new Date()
            })

            client.send(JSON.stringify({
              type: 'chat',
              payload: chat
            }));
          }
        }
      })

      
  });
})); 


app.listen(3000)