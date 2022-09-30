const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // 요건 node에서 제공해 주는 것
const fs = require('fs'); // 파일 시스템
const { Op } = require("sequelize");
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk')

const { User, Post, Image, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

try {
  fs.accessSync('uploads');   
} catch (error) {  
  console.log('upload 없어서 생성');  
  fs.mkdirSync('uploads');
} 
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});
// form 마다 다를 수 있어서 따로 해줘야한다
const uploads = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'mydiary93',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 5mb
});

router.post('/', isLoggedIn, uploads.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/(#[^\s#]+)/g);
    const post = await Post.create({
      content: req.body.content,
      date: req.body.date,
      UserId: req.user.id,
    });
    if (hashtags) {
        const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }, 
        }))) // [#노드, true], [#리액트, true] 이런식으로 나옴
        await post.addHashtags(result.map((y) => y[0]))
    } // 있으면 가져오고 없으면 등록 
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지 여러 개 올리면 image: [1.png, 2.png....]
          const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image, postImgId: req.body.postImgId })));// db에는 파일 주소만 올리지 파일 자체를 올리는게 아니다!
          await post.addImages(images);
        } else { // 하나면 1.png 이런식으로 
          const image = await Image.create({ src: req.body.image, postImgId: req.body.postImgId })
          await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image
      }
      , {
        model: User,
        attributes: ['userId', 'nickname'],
      }
      ]
    })
    console.log(fullPost);
    res.status(201).json(fullPost);
  } catch(error) {
    console.error(error)
    next(error)
  }
})

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
  try {
    console.log(req.params.postId)
      await Post.destroy({
          where: { id: req.params.postId, userId: req.user.id }
      })
      res.json({ PostId: parseInt(req.params.postId, 10) })
  } catch (error) {
      console.error(error);
      next(error)
  }
})

router.post('/images', isLoggedIn, uploads.array('image'), async (req, res, next) => { // post /images
  console.log(req.files);
  res.json(req.files.map((v) => v.location));
})

router.post('/image', isLoggedIn, uploads.single('image'), async (req, res, next) => { // post /image
  console.log(req.file);
  res.json(req.file.location);
})

router.post('/profilephoto', isLoggedIn, uploads.single('image'), async (req, res, next) => { 
  try {
  const image = await Image.create({
    userId: req.user.userId,
    src: req.body.image
  });
    res.status(201).json(image); 
  } catch (error) {
    console.error(error)
  }
}) 

router.get('/profilephoto', isLoggedIn, uploads.single('image'), async (req, res, next) => { 
  try {
  const image = await Image.findOne({
    where: {userId: req.user.userId },
    order: [
      ['createdAt', 'DESC'],
    ]
  });
    res.status(201).json(image);  
  } catch (error) {
    console.error(error)
  }
})

router.patch('/images/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const updateImageId = await Image.update({
      postImgId: req.body.toNull,
    }, {
      where: { postImgId: req.body.postImgId }, 
    });
    res.status(201).json(updateImageId);
  } catch(error) { 
    console.error(error)
    next(error)
  }
})


router.patch('/', isLoggedIn, uploads.array(), async (req, res, next) => { 
  try {
    const hashtags = req.body.content.match(/(#[^\s#]+)/g);
    await Post.update({
      date: req.body.date,
      content: req.body.content
    }, {
      where: { id: req.body.PostId, userId: req.user.id }
    });
    const post = await Post.findOne({ where: { id: req.body.PostId }});
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); // [[노드, true], [리액트, true]]
      await post.setHashtags(result.map((v) => v[0]));
    } 
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지 여러 개 올리면 image: [1.png, 2.png....]
          await Promise.all(req.body.image.map((image) => Image.create({ src: image, PostId: req.body.PostId, postImgId: req.body.postImgId })));// db에는 파일 주소만 올리지 파일 자체를 올리는게 아니다!
          //await post.addImages(images);
        } else { // 하나면 1.png 이런식으로 
          await Image.create({ src: req.body.image, PostId: req.body.PostId, postImgId: req.body.postImgId })
          //await post.addImages(image);
      }
    } 
    const fullPost = await Post.findOne({
      where: { id: req.body.PostId, userId: req.user.id },
      include: [{
        model: Image,
        where: { postImgId: {[Op.not]: null } }
      }
      ]
    })
    console.log(fullPost);
  res.status(200).json({ PostId: parseInt(req.body.PostId, 10), date: req.body.date, content: req.body.content, Images: fullPost });
  } catch (error) {
    console.error(error)
  }
})

module.exports = router; 