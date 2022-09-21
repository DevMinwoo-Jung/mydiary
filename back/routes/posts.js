const express = require('express');
const { Post, Image, User } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');


router.get('/', async (req, res, next) => { // GET /posts
  try {
    const where = {};
    console.log('--------')
    console.log(req.query.lastId)
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)} 
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where: { UserId: req.user.id },  
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'], 
      ],
      include: [
      {
        model: User,
        attributes: ['userId', 'nickname'],
      }, 
      {
        model: Image,
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;