const express = require('express');
const { Op } = require('sequelize');

const { User, Hashtag, Image, Post } = require('../models');

const router = express.Router();

router.get('/:hashtag', async (req, res, next) => { //get/hashtag/something
try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where: { userId: req.user.id },   
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'], 
      ],
      include: [{ 
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.hashtag) },
      }, {
        model: User,
        attributes: ['id', 'nickname'],
        where: { id: req.user.id },   
      }, {
        model: Image,
        where: { postImgId: {[Op.not]: null } }
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