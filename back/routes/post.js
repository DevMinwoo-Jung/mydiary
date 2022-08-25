const express = require('express');
const { Post, Image } = require('../models')

const router = express.Router();


router.post('/', async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
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

router.delete('/', (req, res) => {
  res.json('delete')
})

module.exports = router;