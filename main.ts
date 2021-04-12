import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import bookRouter from './routes/book.ts'

const app = new Application();
const PORT = 3333
const router = new Router()

router.get('/api',(context : RouterContext)=>{
    context.response.body =   'Silence is golden'
})


app.use(router.routes())
app.use(bookRouter.routes())
app.use(router.allowedMethods())

app.use((ctx) => {
ctx.response.body = "Hello World!";
});

console.log('Server is up')

await app.listen({ port: PORT });