import express from 'express';

const app = express();

app.use(express.json());


app.get('/users', (request, response) =>{
    console.log(request.body);
});

//GET
app.get('/users', (request, response) =>{
    return response.json('Hello Word');
});

//POST
app.post('/users',(request, response) =>{
    const users = [
        {name: 'Larissa', age: 24},
        {name: 'Alexandre', age: 21}
    ];

    return response.json(users);
})

app.listen(3333);
//ouve requisições http

