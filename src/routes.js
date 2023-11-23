const { Router } = require('express');
const checkToken = require('./app/middlewares/checkToken');

const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const PostController = require('./app/controllers/PostController');
const CommentController = require('./app/controllers/CommentController');

const router = Router();

router.post('/auth/register', AuthController.store);
router.post('/auth/login', AuthController.login);

router.put('/user', checkToken, UserController.update);
router.delete('/user', checkToken, UserController.delete);
router.get('/user/findByName', UserController.findAllByName);
router.get('/user/findPopularUsersInPost', UserController.findAllPopularUsersInPost);

router.post('/post', checkToken, PostController.store);
router.delete('/post/:id', checkToken, PostController.delete);
router.get('/post/:id', checkToken, PostController.show);
router.get('/post/findByUser/:id_user', checkToken, PostController.findAllByUser);
router.put('/post/like/:id', checkToken, PostController.addLike);

router.post('/comment', checkToken, CommentController.store);
router.delete('/comment/:id', checkToken, CommentController.delete);
router.get('/comment/findByPost/:id_post', checkToken, CommentController.findAllByPost);

module.exports = router;
