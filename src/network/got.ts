import {IncomingMessage} from 'http'
import pauseStream = require('pause-stream')
import getAuthToken = require('registry-auth-token')
import createCache from './createCache'
import memoize = require('lodash.memoize')

export type RequestParams = {
  headers?: {
    authorization: string
  }
}

export type HttpResponse = {
  body: string
}

export type Got = {
  get: (url: string) => Promise<HttpResponse>,
  getStream: (url: string) => Promise<IncomingMessage>,
  getJSON<T>(url: string): Promise<T>
}

export type NpmRegistryClient = {
  get: Function,
  fetch: Function
}

export default (client: NpmRegistryClient, opts: {cachePath: string, cacheTTL: number}): Got => {
  const cache = createCache({
    ttl: opts.cacheTTL,
    path: opts.cachePath
  })

  async function get (url: string) {
    const cachedValue = await cache.get(url)
    if (cachedValue) return cachedValue
    const value = await new Promise((resolve, reject) => {
      client.get(url, createOptions(url), (err: Error, data: Object, raw: Object, res: HttpResponse) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
    cache.set(url, value)
    return value
  }

  async function getJSON (url: string) {
    const cachedValue = await cache.get(url)
    if (cachedValue) return cachedValue
    const value = await new Promise((resolve, reject) => {
      client.get(url, createOptions(url), (err: Error, data: Object, raw: Object, res: HttpResponse) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
    cache.set(url, value)
    return value
  }

  const getStream = function (url: string): Promise<IncomingMessage> {
    return new Promise((resolve, reject) => {
      client.fetch(url, createOptions(url), (err: Error, res: IncomingMessage) => {
        if (err) return reject(err)
        const ps = pauseStream()
        res.pipe(ps.pause())
        resolve(ps)
      })
    })
  }

  function createOptions (url: string): RequestParams {
    const authToken = getAuthToken(url, {recursive: true})
    if (!authToken) return {}
    return {
      headers: {
        authorization: `${authToken.type} ${authToken.token}`
      }
    }
  }

  return {
    get: memoize(get),
    getJSON: memoize(getJSON),
    getStream: getStream
  }
}
