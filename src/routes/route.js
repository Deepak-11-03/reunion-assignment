const express =require('express')
const router = express.Router()
const userController =require('../controllers/userController')
const postController =require('../controllers/postController')
const auth =require('../auth/authenticate')


router.post('/api/user' , userController.createUser)
router.post('/api/authenticate' , userController.login)
router.get('/api/user' ,auth.auth, userController.getProfile)
router.put('/api/follow', auth.auth, userController.follow)
router.put('/api/unfollow', auth.auth, userController.unFollow)



router.post('/api/posts' ,auth.auth, postController.createPost)
// router.post('/api/follow/:id' , userController)
router.get('/api/posts/:id' , postController.getPost)
router.get('/api/all_posts' , postController.allPost)
router.put('/api/like/:id' , auth.auth,postController.like)
router.put('/api/unlike/:id' ,auth.auth, postController.unLike)
router.put('/api/comments/:id' ,auth.auth, postController.comments)
router.delete('/api/posts/:id' , auth.auth , postController.deletePost)


module.exports =router