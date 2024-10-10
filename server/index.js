  const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const posts=require('./routes/api/posts');


const PORT=process.env.PORT || 8080;
//midelwares
app.use(bodyParser.json());
app.use(cors());
//routes

app.use('/api/posts',posts);
app.listen(PORT,()=>{
  console.log(`server running in port: http://localhost:${PORT}`)
});
