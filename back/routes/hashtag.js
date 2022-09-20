const express = require('express');
const { Op } = require('sequelize');

const { User, Hashtag, Image, Post } = require('../models');

const router = express.Router();

router.get('/:hashtag', async (req, res, next) => { //get/hashtag/something
try {
  console.log('----------------')
  console.log('여기 안오니??')
  console.log(req.params.hashtag)
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      include: [{
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.hashtag) },
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }],
    });
    // console.log(posts)
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;