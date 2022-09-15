const postModel =require('../models/postModel');


const createPost =async(req,res)=>{
    try {
        let data = req.body;
        // check the body is empty
        if (Object.keys(data).length == 0) {
            return res.status(400).send({msg: 'Invalid Request !! Please Enter post Detail ' })
        }
        const { title, description } = data;
        if(!title){
            return res.status(400).send({message :" Please enter title of post"})
        }
        if(!description){
            return res.status(400).send({message :" Please enter description of post"})
        }
        let postInfo ={title ,description}
        const postData =await postModel.create(postInfo)
        return res.status(201).send({message:"Post created" , data:postData})
    } catch (err) {
        return res.status(500).send({error: err.message });
    }
}


const getPost =async(req,res)=>{
    try {
        let postId = req.params.id;

        const post = await postModel.findById(postId).select({created_at:0,__v:0})
        if(!post){
            return res.status(400).send({message:" post not found"})
        }
        return res.status(200).send({message:"Post Details" , data :post})
    } catch (err) {
        return res.status(500).send({error: err.message });
    }
}

const allPost =async(req,res)=>{
    try {

        const allPost =await postModel.find().select({created_at:0,__v:0}).sort({created_at:1})
        return res.status(200).send({message:" All Post " , data :allPost})
        
    } catch (err) {
        return res.status(500).send({error: err.message });
    }
}

const like =async(req,res)=>{
    try {
        const postId = req.params.id;

        const postExist =await postModel.findById(postId)
        if(!postExist){
            return res.status(400).send({message:" post not found"})
        }

        await postModel.findOneAndUpdate({_id:postId} ,{ $inc: { "likes": +1 }})
        return res.status(200).send({message:"done"})
    }  catch (err) {
        return res.status(500).send({error: err.message });
    }
}

const unLike =async(req,res)=>{
    try {
        const postId = req.params.id;

        const postExist =await postModel.findById(postId)
        if(!postExist){
            return res.status(400).send({message:" post not found"})
        }
        await postModel.findOneAndUpdate({_id:postId} ,{ $inc: { "unLikes": -1 }})
        return res.status(200).send({message:"done"})
    }  catch (err) {
        return res.status(500).send({error: err.message });
    }
}
const comments =async(req,res)=>{
    try {
        const postId = req.params.id;
        const data = req.body

        const {comment} =data
        if(!comment){
            return res.status(400).send({message:"Please enter the comment"})
        }
        const postExist =await postModel.findById(postId)
        if(!postExist){
            return res.status(400).send({message:" post not found"})
        }
        let comments =postExist.comments

        comments.push(comment)

        postExist.save()

        return res.status(200).send({message:"done"})
    }  catch (err) {
        return res.status(500).send({error: err.message });
    }
}

module.exports={createPost,getPost,allPost,like,unLike,comments}