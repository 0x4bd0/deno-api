import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";

const bookRouter = new Router()

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
bookRouter.get('/api/books',(context : RouterContext)=>{
    context.response.body =   books
})

bookRouter.get('/api/books/:id',(context : RouterContext)=>{
    let data : Array<book> =  books.filter(item=>item.Id === context.params.id)
    context.response.body =   data.length >  0  ?  data.pop()  : "Not found"
})

bookRouter.post('/api/books',async(context : RouterContext)=>{

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

    context.response.body = book
})


bookRouter.put('/api/books/:id',async(context : RouterContext)=>{
    
    let data  =  books.findIndex(item=>item.Id === context.params.id)

    if(data  == -1) {
    context.response.body =  'Not found'
    return
    }

    let body = context.request.body()

    let requestBody = await body.value

    let book : book = {
        Id: books[data].Id,
        Name: requestBody.name ?? null,
        Author: requestBody.author ?? null,
        BookType: requestBody.bookType ?? null,
        Price: requestBody.price ?? null,
    }

    books[data] =  book

    context.response.body = book
})


bookRouter.delete('/api/books/:id',async(context : RouterContext)=>{
    
    let data  =  books.findIndex(item=>item.Id === context.params.id)

    if(data  == -1) {
    context.response.body =  'Not found'
    return
    }

    books.splice(data,1);

    context.response.body = books
})


export default bookRouter