const express = require('express')
const next = require('next')
const path = require('path')

const compression = require('compression')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use(compression())

    server.get("/service-worker.js", (req, res) => {
      // Don't cache service worker is a best practice (otherwise clients wont get emergency bug fix)
      res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.set("Content-Type", "application/javascript");
      if (dev) {
        console.log('dev - sw from static');
        app.serveStatic(req, res, path.resolve("./static/service-worker.js"));
      } else {
        console.log('next - sw from next');
        app.serveStatic(req, res, path.resolve("./.next/service-worker.js"));
      }
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })