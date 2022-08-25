const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const { User, Post, Image } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
            exclude: ['password'] // 비밀번호 제외하고 다 가져온다
        },
        include: [{ // 다른 테블의 정보를 가져올 때  쓴다 (join 같은 것 인듯)
            model: Post, 
            attributes: ['id'],
        }]
    })
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null)
    }
  } catch(error) {
    console.error(error)
    next(error)
  }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
      if (error) { // server error
          console.error(error);
          return next(error);
      }
      if (info) { // client error
          return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => {
          if (loginErr) { 
              console.error(loginErr);
              return next(loginErr); // next에 error가 있으면 다음 미들웨어로 가는게 아니라 바로 에러 처리로 간다
          }
          try {
              if (req.user) {
                  const fullUserWithoutPassword = await User.findOne({
                      where: { id: req.user.id },
                      attributes: {
                          exclude: ['password'] // 비밀번호 제외하고 다 가져온다
                      },
                      include: [{ // 다른 테블의 정보를 가져올 때  쓴다 (join 같은 것 인듯)
                          model: Post, 
                          attributes: ['id'],
                      }]
                  })
                  return res.status(200).json(fullUserWithoutPassword); // 이제 프론트로 넘기기~
              } else {
                  return res.status(200).json(null); // 이제 프론트로 넘기기~
              }
          } catch (error) {
              console.log(error);
              next(error);
          }
      })
  })(req, res, next) 
});

router.post('/', async (req, res, next) => {
  try { 
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      }
    })
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.')
    }
    const exEmail = await User.findOne({
      where: {
        email: req.body.email,
      }
    })
    if (exEmail) {
      return res.status(403).send('중복된 이메일이 존재합니다.')
    }
    const hashPassword = await bcrypt.hash(req.body.password, 13)
    await User.create({
      userId: req.body.userId,
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashPassword
    })
    res.send('ok')
} catch (error) {
  console.log(error)
  next(error)
  }
})

router.delete('/', (req, res) => {
  res.json('delete')
})

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
})

module.exports = router;