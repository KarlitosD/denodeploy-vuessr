import { serve } from "https://deno.land/std@0.159.0/http/server.ts"
import { Hono } from "https://deno.land/x/hono@v2.2.5/mod.ts"
import { renderApp } from "./server.js"

const app = new Hono()


app.get("/", async ctx => {
  const html = await renderApp()
  return ctx.html(html)
})

console.log("Listening on http://localhost:8000");
await serve(app.fetch, { port: 8000 });
