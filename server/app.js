import express from 'express'
import bodyParse from 'body-parser'
import data from './data'
import {mongo_uri} from './config'
import mongoose from 'mongoose'
import userRoute from './routes/user'
import productRoute from './routes/product'

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => console.log(error.reason))

const app = express()
app.use(bodyParse.json())
app.use("/api/user", userRoute)
app.use('/api/product', productRoute)

app.listen(5000, ()=>{
    console.log('Server is listening at port 5000')
})