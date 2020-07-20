import express from 'express'
import User from '../models/user'
import { getToken } from '../utils'

const router = express.Router()

router.post("/signin", async(req, res) => {
    try {
        const { email, password } = req.body
        const signedUser = await User.findOne({
            email, password
        })
        if(signedUser){
            res.send({
                _id: signedUser._id,
                email: signedUser.email,
                name: signedUser.name,
                isAdmin: signedUser.isAdmin,
                token: getToken(signedUser)
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(401).send({msg: 'Invalid Email or Password'})
    }
})

router.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body
        const user = new User({
            name, email, password
        })
        
        const newUser = await user.save()
        if(newUser){
            res.send({
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(401).send({msg: 'Invalid User Data'})
    }
})

router.get("/createadmin", async(req, res) => {
    try {
        const user = new User({
            name: "Myna",
            password: "chun6002",
            "email": "abc@gmail.com",
            "isAdmin": true
        })
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        res.send({msg: error.message})
    }
})

export default router