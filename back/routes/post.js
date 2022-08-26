const express = require('express');
const { User, Post, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const multer = require('multer');
const path = require('path'); // 요건 node에서 제공해 주는 것
const fs = require('fs'); // 파일 시스템

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('upload 없어서 생성');
  fs.mkdirSync('uploads');
}

// form 마다 다를 수 있어서 따로 해줘야한다
const uploads = multer({
  storage: multer.diskStorage({
      destination(req, file, done) {
          done(null, 'uploads');
      },
      filename(req, file, done) { // 중복 방지
          const ext = path.extname(file.originalname); // 확장자 추줄
          const basename = path.basename(file.originalname, ext)  // 이름 주출
          done(null, basename + '_' + new Date().getTime() + ext); // 민우 213213.png
      }
  }),
  limits: { fileSize: 20 * 1024 * 1024 } // 20mb
})// array인 이유가 여러 장 일수도 있어서, text는 none, 한장이면 single

router.post('/', async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      date: req.body.date,
      UserId: req.user.id,
    })
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image
      }, {
        model: User
      } 
    ]
    })
    res.status(201).json(fullPost)
  } catch(error) {
    console.error(error)
    next(error)
  }
})

router.post('/images', isLoggedIn, uploads.array('image'), async (req, res, next) => { // post /images
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
})

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
  try {
      await Post.destroy({
          where: { id: req.params.postId, userId: req.user.id }
      })
      res.json({ PostId: parseInt(req.params.postId, 10) })
  } catch (error) {
      console.error(error);
      next(error)
  }
})

module.exports = router;