const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.get('/', pageController.getRejection);
router.get('/review', pageController.getReview);
router.post('/review', pageController.postReview);
router.get('/members', pageController.getMembers);
router.get('/members/posts/:slug', pageController.getPost);
router.use(pageController.notFound);

module.exports = router;
