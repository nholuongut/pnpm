import {LoggerType} from './logger'

export type PnpmOptions = {
  cwd?: string,
  global?: boolean,
  globalPath?: string,
  storePath?: string,
  silent?: boolean,
  logger?: LoggerType,
  ignoreScripts?: boolean
  save?: boolean,
  saveDev?: boolean,
  saveOptional?: boolean,
  production?: boolean,
  fetchRetries?: number,
  fetchRetryFactor?: number,
  fetchRetryMintimeout?: number,
  fetchRetryMaxtimeout?: number,
  saveExact?: boolean,
  force?: boolean,
  linkLocal?: boolean,
  depth?: number,

  // proxy
  proxy?: string,
  httpsProxy?: string,
  localAddress?: string,

  // ssl
  cert?: string,
  key?: string,
  ca?: string,
  strictSsl?: boolean,

  userAgent?: string,
  tag?: string,

  cacheTTL?: number
}

export type StrictPnpmOptions = {
  cwd: string,
  global: boolean,
  globalPath: string,
  storePath: string,
  silent: boolean,
  logger: LoggerType,
  ignoreScripts: boolean
  save: boolean,
  saveDev: boolean,
  saveOptional: boolean,
  production: boolean,
  fetchRetries: number,
  fetchRetryFactor: number,
  fetchRetryMintimeout: number,
  fetchRetryMaxtimeout: number,
  saveExact: boolean,
  force: boolean,
  linkLocal: boolean,
  depth: number,

  // proxy
  proxy?: string,
  httpsProxy?: string,
  localAddress?: string,

  // ssl
  cert?: string,
  key?: string,
  ca?: string,
  strictSsl: boolean,

  userAgent?: string,
  tag: string,

  cacheTTL: number
}

export type Dependencies = {
  [name: string]: string
}

export type Package = {
  name: string,
  version: string,
  bin?: string | {
    [name: string]: string
  },
  dependencies?: Dependencies,
  devDependencies?: Dependencies,
  optionalDependencies?: Dependencies,
  scripts?: {
    [name: string]: string
  }
}