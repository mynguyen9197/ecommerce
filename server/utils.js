import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config'

const getToken = (user) => {
    jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, JWT_SECRET, {
        expiresIn: '48h'
    })
}

const isAuth = async(req, res, next) => {
    try {
        const {token} = req.headers.authorization
        if(token){

            const decode = await jwt.verify(token.split(':')[1], JWT_SECRET)
            if(decode){
                req.user = decode
                return next()
            }
        }
    } catch (error) {
        return res.status(401).send({msg: 'Token is not supplied'})
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        return next()
    }
    return res.status(401).send({msg: 'Admin token is not valid'})
}

export {
    getToken, isAuth, isAdmin
}