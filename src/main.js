// @ts-check
//

const http = require('http')
const { routes } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      ({ url, method }) =>
        req.url && req.method && url.test(req.url) && method == req.method
    )

    if (!req.url || !route) {
      res.statusCode = 404
      res.end('Not found.')
      return
    }

    const regexResult = route.url.exec(req.url)

    if (!regexResult) {
      res.statusCode = 404
      res.end('Not found.')
      return
    }

    /** @type {string | undefined}  */
    const body =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8')
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data))
            } catch {
              reject(new Error('parse json'))
            }
          })
        }))) ||
      undefined

    const result = await route.callback(regexResult, body)
    res.statusCode = result.statusCode

    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result.body))
    }
  }

  main()

  // const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
  // const postIdRegexResult =
  //   (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined

  // if (req.url === '/posts' && req.method === 'GET') {
  //   // list
  //   const result = {
  //     posts: posts.map((post) => ({
  //       id: post.id,
  //       title: post.title,
  //     })),
  //     totalCount: posts.length,
  //   }

  //   res.statusCode = 200
  //   res.setHeader('Content-Type', 'application/json')
  //   res.end(JSON.stringify(result))
  // } else if (postIdRegexResult && req.method === 'GET') {
  //   // get
  //   const postId = postIdRegexResult[1]
  //   const post = posts.find(({ id }) => id == Number(postId))

  //   if (post) {
  //     res.statusCode = 200
  //     res.setHeader('Content-Type', 'application/json')
  //     res.end(JSON.stringify(post))
  //   } else {
  //     res.statusCode = 404
  //     res.end('post Not found.')
  //   }
  // } else if (req.url === '/posts' && req.method === 'POST') {
  //   req.setEncoding('utf-8')
  //   req.on('data', (data) => {
  //     posts.push(JSON.parse(data))

  //     // create
  //     res.statusCode = 200
  //     res.setHeader('Content-Type', 'application/json')
  //     res.end(data)
  //   })
  // } else {
  //   res.statusCode = 404
  //   res.end('Not found.')
  // }
})

const examplePost = {
  id: 'abc',
  title: 'abc',
  content: 'abc',
}

// console.log(examplePost)

const PORT = 4000
server.listen(PORT, () => {
  console.log('server on ', PORT)
})
