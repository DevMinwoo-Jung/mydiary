const express = require('express');
const postRouter = require('./routes/post')
const db = require('./models')
const dotenv = require('dotenv')

dotenv.config();
const app = express(); 
// 이건 서버!
db.sequelize.sync()
    .then(() => {
        console.log('db connect success!!!') 
    })
    .catch((error) => {
        console.error(error)
    })
app.use('/post', postRouter)

app.get('/', (req, res) => {
  res.send('hello express')
})


app.listen(3065, () => {
  console.log('server running...')
});