
import path from 'path';
import fs from 'fs';

import express from 'express';
import cors from 'cors';

import { getBalance } from './modules/ethers'

const app = express();
app.use(cors())
const port = 8080

app.use('/static', express.static(path.join(__dirname, '..', 'lib')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'))


app.get('/', (req, res) => {
    res.render('base')
});
// app.post('/blockNum', (req, res) => {

// })

app.get('/balance', async (req, res) => {
    let b = await getBalance()
    res.send(b)
}
)


app.listen(port, () => console.log(`Listening to ${port}`))