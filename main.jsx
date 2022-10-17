// /** @jsx h */

import { serve } from "https://deno.land/std@0.120.0/http/server.ts";
import { createSSRApp, h, ref } from "https://esm.sh/vue";
import { renderToString } from "https://esm.sh/vue/server-renderer";

//  if (pathname.startsWith("/style.css")) {
//     // Read the style.css file from the file system.
//     const file = await Deno.readFile("./style.css");
//     // Respond to the request with the style.css file.
//     return new Response(file, {
//       headers: {
//         "content-type": "text/css",
//       },
//     });
//   }

async function handler(req) {
  const { pathname } = new URL(req.url)
  console.log(pathname)
  const app = createSSRApp({
    setup(){ 
      const counter = ref(0)
      const inc = () => counter.value++
      return () => <button onClick={inc}>{counter.value}</button>;
    }
  })
  // const app = createSSRApp({
  //   data: () => ({ count: 1 }),
  //   template: `<button @click="count++">{{ count }}</button>`
  // })
  const html = await renderToString(app)
  const res = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vue SSR Example</title>
        </head>
        <body>
          <div id="app">${html}</div>
          <script type="module" src="/client.js">
              // import { createSSRApp, h, ref } from "https://esm.sh/vue";
              // const app = createSSRApp({
              //   setup(){ 
              //     const counter = ref(0)
              //     const inc = () => counter.value++
              //     return () => h("button", {
              //       onClick: inc
              //     }, counter.value)
              //   }
              // })
              // app.mount("#app")
          </script>
        </body>
      </html>
  `
  return new Response(res, {
    headers: {
      'content-type': 'text/html; charset=UTF-8'
    }
  })
}

console.log("Listening on http://localhost:8000");
await serve(handler);