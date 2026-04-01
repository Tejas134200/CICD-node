const express = require("express")

const app = express();

const PORT = process.env.PORT||8000;

app.get('/' , (req , res)=>{
    res.json({"Message":"SARA loves Tejass"});
})

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})