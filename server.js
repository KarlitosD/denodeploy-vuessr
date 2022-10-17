import { renderToString } from "https://esm.sh/vue@3.2.41/server-renderer";
import { createApp } from "./src/main.js";

console.log("Hasta aca llegue")

import { bundle } from "https://deno.land/x/emit@0.9.0/mod.ts"
const { code } = await bundle("./client.js")

// console.log({ code })

export const renderApp = async () => {
    const app = createApp()
    const appString = await renderToString(app);
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Vue SSR Example</title>
        </head>
        <script type="module">${code}</script>
        <body>
            <div id="app">${appString}</div>
        </body>
        </html>
    `
    return html
}