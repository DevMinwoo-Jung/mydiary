const express = require('express')
const cors = require('cors')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
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

app.use(cors({
  origin: true,
  credentials: false
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/post', postRouter)
app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send('hello express')
})


app.listen(3065, () => {
  console.log('server running...')
});