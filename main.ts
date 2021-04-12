import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const PORT = 3333
const router = new Router()

type book  =  {
    Id  : String,
    Name : String,
    Author :  String,
    BookType : String,
    Price : Number
}

const  books  : Array<book> =  [
    {
                    Id  : "id1",
					Name :"Harry Potter and the Philosopher's Stone",
					Author : "J. K. Rowling",
					BookType : "fantasy",
					Price  : 19,
    }
]

router.get('/api',(context : RouterContext)=>{
    context.response.body =   'Silence is golden'
})

router.get('/api/books',(context : RouterContext)=>{
    context.response.body =   books
})

router.get('/api/books/:id',(context : RouterContext)=>{
    let data : Array<book> =  books.filter(item=>item.Id === context.params.id)
    context.response.body =   data.length >  0  ?  data.pop()  : "Not found"
})

router.post('/api/books',async(context : RouterContext)=>{

    let body = context.request.body()

    let requestBody = await body.value

    let book : book = {
        Id: Math.random().toString(36).slice(-6),
        Name: requestBody.name ?? null,
        Author: requestBody.author ?? null,
        BookType: requestBody.bookType ?? null,
        Price: requestBody.price ?? null,
    }

    books.push(book)

    context.response.body = books
})

app.use(router.routes())
app.use(router.allowedMethods())

app.use((ctx) => {
ctx.response.body = "Hello World!";
});

console.log('Server is up')

await app.listen({ port: PORT });