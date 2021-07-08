import express from 'express';
import { addTwo } from './rest_handle.mjs';

const app = express()
const port = 3000
app.use(express.json());


// Prints: 6
console.log(addTwo(4));

let TEST_GLOBAL_VAL;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users/:userId/books/:bookId', function (req, res) {
    console.log(req.params)
    res.send(req.params)
  })

app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

// app.route()
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    TEST_GLOBAL_VAL = req.body['hello'];
    console.log(TEST_GLOBAL_VAL)
    res.send(req.body);
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})