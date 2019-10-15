var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var action = require('./action');

app.post('/inscription', action.inscription);

app.listen('3030',()=>{
    console.log('Hello World !');
})