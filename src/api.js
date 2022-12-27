// @ts-check

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {*} body
 */

const fs = require('fs')

const DB_JSON_FILE = 'database.json'

async function getPosts() {
  const json = await fs.promises.readFile(DB_JSON_FILE)
  return JSON.parse(json).posts
}

async function savePosts(posts) {
  const content = {
    posts,
  }

  return fs.promises.writeFile(DB_JSON_FILE, JSON.stringify(content), 'utf-8')
}

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matcheds: string[], body: any) => Promise<*>} callback
 */

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => {
      const posts = await getPosts()
      return {
        statusCode: 200,
        body: posts,
      }
    },
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (matches) => {
      const postId = matches[1]
      if (!postId) {
        return {
          statusCode: 404,
          body: 'Not found.',
        }
      }
      const posts = await getPosts()
      const post = posts.find(({ id }) => id == Number(postId))

      if (!post) {
        return {
          statusCode: 404,
          body: 'Not found.',
        }
      }
      return {
        statusCode: 200,
        body: post,
      }
    },
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
      if (!body) {
        return {
          statusCode: 400,
          body: 'not data',
        }
      }

      const posts = await getPosts()
      posts.push(body)
      savePosts(posts)

      return {
        statusCode: 200,
        body: body,
      }
    },
  },
]

module.exports = {
  routes,
}
