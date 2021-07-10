import express from 'express';
import path from 'path';

import {makeErcMeta} from './lib/utils.mjs';

const __dirname = path.resolve();
const app = express();
const port = 3000;
const token_path = '../ERC1155meta/token/';

app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});



app.route('/energy')
  .get(function (req, res) {
    let meta_obj = makeErcMeta(token_path, "LJS", 60, 1000, 20);
    res.send(meta_obj)
  })
  .post(function (req, res) {
    let temp  = req.body['hello'];
    console.log(temp)
    res.send(req.body);
  })


  app.listen(port, () => {
    console.log(`My app listening at http://localhost:${port}`)
  })
