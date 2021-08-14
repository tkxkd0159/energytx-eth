
import path from 'path';
import fs from 'fs';

import express from 'express';
import cors from 'cors';

import { getBalance } from './modules/ethers'
import { wrapper } from './modules/utils'

const app = express();
app.use(cors())
const port = 3000

app.use('/static', express.static(path.join(__dirname, '..', 'lib')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'))


app.get('/', (req, res) => {
    res.render('base')
});
// app.post('/blockNum', (req, res) => {

// })

app.get('/balance', wrapper(async (req, res) => {
    let b = await getBalance()
    res.send(b)
})
)


app.listen(port, () => console.log(`Listening to ${port}`))