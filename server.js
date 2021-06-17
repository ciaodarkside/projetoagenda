require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');


mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        //emitindo um sinal
        console.log('conectei a base de dados');
        app.emit('pronto');
    })
    .catch((error) => console.log(error));
    

const routes = require('./routes');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware');

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, 'public')));


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//middleware global
app.use(meuMiddleware);

app.use(routes);

app.on('pronto', () =>{
    app.listen(3000, () => {
        console.log('Executando em localhost:3000'); 
    })
})