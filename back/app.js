const express = require('express');
const app = express()
const postRouter = require('./routes/post')

app.use('/post', postRouter)

app.get('/', (req, res) => {
  res.send('hello express')
})


app.listen(3065, () => {
  console.log('server running...')
});