import express from 'express'
import Product from '../models/product'
import { getToken } from '../utils'
import { removeAllListeners } from 'nodemon'

const router = express.Router()

router.get("/", async(req, res) => {
    const products = await Product.find({})
    res.send(products)
})

router.get("/:id", async(req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id})
        if(product){
            res.send(product)
        }
    } catch (error) {
        return res.status(404).send({msg: 'Product Not Found'})
    }
})

router.post("/", async(req, res) => {
    try {
        const newProduct = new Product({name: req.body.name,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews})
        
            const savedProduct = await newProduct.save()
            if(savedProduct){
                res.send(savedProduct)
            }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({mgs: 'Wrong'})
    }
})

export default router