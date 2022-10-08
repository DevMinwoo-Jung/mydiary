const express = require('express')
const cors = require('cors')
const postRouter = require('./routes/post')
const postsRouter = require('./routes/posts')
const userRouter = require('./routes/user')
const hashtagRouter = require('./routes/hashtag')
const db = require('./models')
const passportConfig = require('./passport');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path')
const hpp = require('hpp')
const helmet = require('helmet')

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

passportConfig()  

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({
    origin: ['http://mydiary93.com','http://www.mydiary93.com', 'http://15.164.71.199', 'http://localhost:3000/', 'mydiary93.com'],
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
}

app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false, 
    secret: process.env.COOKIE_SECRET,  
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && '.mydiary93.com'
    }
}));
app.use(passport.initialize());
app.use(passport.session()); 

app.get('/', (req, res) => {
  res.send('연결됐다~~!');
});

app.use('/post', postRouter)
app.use('/posts', postsRouter) 
app.use('/user', userRouter)
app.use('/hashtag', hashtagRouter) 

app.listen(80, () => {
  console.log('server running...')
});