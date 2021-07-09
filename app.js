import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const app = express()
const port = 3000
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.get('/ejs', (req, res) => {
    res.render('test', {
        custom_name: "My homepage",
        length: 5
    });
});



// app.route('/energy')
//   .get(function (req, res) {
//     res.send('Get a random book')
//   })
//   .post(function (req, res) {
//     let  = req.body['hello'];
//     console.log(TEST_GLOBAL_VAL)
//     res.send(req.body);
//   })



  app.listen(port, () => {
    console.log(`My app listening at http://localhost:${port}`)
  })