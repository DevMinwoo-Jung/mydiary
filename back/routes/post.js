const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // 요건 node에서 제공해 주는 것
const fs = require('fs'); // 파일 시스템

const { User, Post, Image, Hashtag } = require('../models');
// const { isLoggedIn } = require('./middlewares');

 
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

router.post('/', uploads.none, async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/(#[^\s#]+)/g);
    const post = await Post.create({
      content: req.body.content,
      date: req.body.date,
      UserId: req.user.id,
    })
    if (hashtags) {
        const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }, 
        }))) // [#노드, true], [#리액트, true] 이런식으로 나옴
        await post.addHashtags(result.map((y) => y[0]))
    } // 있으면 가져오고 없으면 등록 
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지 여러 개 올리면 image: [1.png, 2.png....]
          const images = await Promise.all(req.body.image.map((image) => { // db에는 파일 주소만 올리지 파일 자체를 올리는게 아니다!
              Image.create({ src: image })}));
          await post.addImages(images);
      } else { // 하나면 1.png 이런식으로 
          const image = await Image.create({ src: req.body.image })
          await post.addImages(image);
      }
  } 
<<<<<<< HEAD
=======
    const post = await Post.create({
      content: req.body.content,
      date: req.body.date,
      UserId: req.body.userId,
    })
>>>>>>> 649134c (20220827)
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image
      }, {
        model: User
      } 
    ]
    })
    console.log(fullPost)
    res.status(201).json(fullPost)
  } catch(error) {
    console.error(error)
    next(error)
  }
})

router.delete('/:postId', async (req, res, next) => { // DELETE /post/1/like
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

router.post('/images', uploads.array('image'), async (req, res, next) => { // post /images
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
})

module.exports = router;