const express = require("express")

const app = express();

const PORT = process.env.PORT||8000;

app.get('/' , (req , res)=>{
    res.json({"Message":"Hi From SARA is Love"});
})

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})