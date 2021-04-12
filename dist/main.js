"use strict";
exports.__esModule = true;
var mod_ts_1 = require("https://deno.land/x/oak/mod.ts");
var app = new mod_ts_1.Application();
var PORT = 3333;
var router = new mod_ts_1.Router();
var books = [
    {
        Id: "id1",
        Name: "Harry Potter and the Philosopher's Stone",
        Author: "J. K. Rowling",
        BookType: "fantasy",
        Price: 19
    }
];
router.get('/api', function (context) {
    context.response.body = 'Silence is golden';
});
router.get('/api/books', function (context) {
    context.response.body = books;
});
router.get('/api/books/:id', function (context) {
    var data = books.filter(function (item) { return item.Id === context.params.id; });
    context.response.body = data.length > 0 ? data.pop() : "Not found";
});
app.use(router.routes());
app.use(router.allowedMethods());
app.use(function (ctx) {
    ctx.response.body = "Hello World!";
});
console.log('Server is up');
await app.listen({ port: PORT });
