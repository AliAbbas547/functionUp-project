const blogModel= require("../models/blogModel");
const authorModel = require("../models/authorModel");
const mongoose = require('mongoose');

const createBlog = async (req, res) => {

  try {
      let Blog = req.body

      if (Object.keys(Blog).length == 0) {
          return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" });
      }
      

      if (!Blog.title) return res.status(400).send({ msg: " title is required " })
      if (!Blog.body) return res.status(400).send({ msg: "body is required " })
      if (!Blog.authorId) return res.status(400).send({ msg: " authorId is required " })
      if (!Blog.category) return res.status(400).send({ msg: " category is require" })


      let blogCreated = await blogModel.create(Blog)

      res.status(201).send({ status: true, data: blogCreated })
  } catch (error) {
      res.status(500).send({ msg: error.message })
  }
}




const getBlogsData = async (req, res) => {
  try {

     let data=await blogModel.find()
     res.send({msg:data})
      
  }
  catch (error) {
      res.status(500).send({ msg: error.message })
  }
}



const updateBlog = async function(req, res) {
    try {
        let title= req.body.title; 
        let body=req.body.body; 
        let tags=req.body.tags;
        let subcategory=req.body.subcategory;
        let id=req.params.blogId;
        console.log("fsdfds",id)
        let getdata=await blogModel.findById(id)
        let data= await blogModel.updateMany({_id:id},{$set:{title:title}})
        
        
        res.status(201).send({status:true,msg:data})
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


const deleteBlog = async function(req, res) {
    try {
        
        let id=req.params.blogId;
        //let getdata=await blogModel.findById(id)
        let data= await blogModel.updateMany({_id:id},{$set:{isDeleted:true}})
        
        
        res.status(201).send({status:true,msg:data})
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


const deleteOneBlog = async function(req, res) {
    try {
        let data=req.query.subcategory;
        let data1= await blogModel.updateMany({subcategory:data},{$set:{isDeleted:true}})
        
        
        res.status(201).send({status:true,msg:data1})
       
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}





        


        





module.exports.createBlog = createBlog
module.exports.getBlogsData = getBlogsData
module.exports.updateBlog = updateBlog
module.exports.deleteBlog=deleteBlog;
module.exports.deleteOneBlog=deleteOneBlog;








