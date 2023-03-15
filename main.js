const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})

app.get('/client', function (request, response) {
  response.render('pages/client', { title: 'Client' })
})

app.get('/project', function (request, response) {
  response.render('pages/project', { title: 'Project' })
})

app.get('/project_doer', function (request, response) {
  response.render('pages/project_doer', { title: 'Project doer' })
})

app.get('/progress', function (request, response) {
  response.render('pages/progress', { title: 'Project in progress' })
})


app.listen(process.env.PORT || 8080);
console.log('Run server!');
