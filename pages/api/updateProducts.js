// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'
import mongoose from 'mongoose'
 const handler = async (req, res) => {
    if(req.method == 'POST'){
        console.table(req.body)
        for (let i=0; i<req.body.length; i++){

             let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
             
            }
            res.status(200).json({success: "sucess"})
    }
    else{
        res.status(400).json({error: "This method is not allowed"})
    }
   
  }
  export async function getServerSideProps(context){
    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGO_URI)
      
    }
    let products = await products.find()
    return{
      props:{
        products
      },
    }
  }
export default connectDb(handler);