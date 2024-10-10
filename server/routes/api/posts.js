const express=require('express');
const mongodb=require('mongodb');
const router=express.Router();


//function
const uri="mongodb+srv://lyesrahal:lyes03021994@cluster0.6tbkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
async function loadPostsCollection(){
  const client=await mongodb.MongoClient.connect(uri)
  return client.db('vue-posts').collection('posts');
}
//get
router.get('/',async(req,res)=>{
  const posts=await loadPostsCollection();
  res.send(await posts.find({}).toArray());
})

//post

router.post('/',async (req,res)=>{
  const posts=await loadPostsCollection();
  await posts.insertOne({
    text:req.body.text,
    createAt:new Date()
  })
res.status(201).send();
})

//delete

router.delete('/:id',async(req,res)=>{
  const posts=await loadPostsCollection();
  await posts.deleteOne({
    _id:new mongodb.ObjectId(req.params.id)
  })
  res.status(201).send();
})



module.exports=router;