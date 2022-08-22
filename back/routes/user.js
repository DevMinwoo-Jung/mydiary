const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models')

const router = express.Router();

router.post('/', async (req, res, next) => {
  try { 
    const exUser = await User.findOne({
      where: {
        email: req.body.userId,
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

module.exports = router;