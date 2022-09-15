const userModel =require('../models/userModel');
const jwt =require('jsonwebtoken');


const createUser = async function (req, res) {
    try {
        let data = req.body
        const {name , email , password} =data

        // Validate the  data is present or not
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: 'Invalid Request !! Please Enter User Detail ' })
        }
        //check for blank data or match with regex syntax
        if (!name || !/[a-zA-Z]/.test(name)) {
            return res.status(400).send({ status: false, msg: 'Please Enter User First Name ' })
        }
        if (!email) {
            return res.status(400).send({ status: false, msg: "Please Enter User's Email " })
        }
        const existingEmail = await userModel.findOne({ email: email })

        if (existingEmail) {
            return res.status(400).send({ status: false, msg: "User with this email is already exist " })
        }
        if(!password){
            return res.status(400).send({ status: false, msg: "Please Enter password" })
        }
        let info ={name , email ,password}

        let user = await userModel.create(info)
        return res.status(201).send({ status: true, msg: "User Created Successfully", data: user })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

const login = async function (req, res) {

    try {
        let data = req.body;
        // check the body is empty
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: 'Invalid Request !! Please Enter User Detail ' })
        }
        const { email, password } = data;

        if (!email) {
            return res.status(400).send({ status: false, message: 'EmailId is required' })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: 'Password is required' })
        }

        const user = await userModel.findOne({ email, password });

        if (!user) {
            return res.status(401).send({ status: false, message: 'Invalid login credentials' });
        }

        // creating jwt token
        const token = jwt.sign({
            userId: user._id
        }, 'secretAccessKeyForLogin', {
            expiresIn: "60 min"
        })
        return res.status(200).send({ status: true, message: 'User login successfull', data: token });

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
}

const getProfile =async(req,res)=>{
    try {
        let userId = req.userid;

        const userData = await userModel.findById(userId)

        return res.status(200).send({status:true ,message:"user Profile" , data:userData})
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
}
const follow = async(req,res)=>{
    try {
        const followerId = req.userid;
        
        let checkFollower = await userModel.findById(followerId);
        if(!checkFollower){
            return res.status(400).send({status:false,message:"no user found "})
        }

        await userModel.findByIdAndUpdate(followerId ,{ $inc: { "followers": +1 }})

return res.status(200).send("done")
        

    } catch (error) {
        return res.status(500).send({ status: false, error: err.message });
    }
}
const unFollow = async(req,res)=>{
    try {
        const followerId = req.userid;
        
        let checkFollower = await userModel.findById(followerId);
        if(!checkFollower){
            return res.status(400).send({status:false,message:"no user found "})
        }

        await userModel.findByIdAndUpdate(followerId ,{ $inc: { "followers": -1 }})

return res.status(200).send("done")
        

    } catch (error) {
        return res.status(500).send({ status: false, error: err.message });
    }
}

module.exports = { createUser, login ,getProfile ,follow ,unFollow}