import { pgConnectionaRouter } from './pgConnection'
import { siteDataRouter } from './siteDataRoute'

export const publicRouter = { siteDataRouter, pgConnectionaRouter }
