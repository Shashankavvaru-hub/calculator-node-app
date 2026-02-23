const express= require('express');
const add = require('./math');
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Kubernetes Node App!");
});

app.get("/add", (req, res) => {
  const result = add(2, 3);
  res.json({ sum: result });
});

app.listen(3000,()=>{
    console.log("Server listening on port 3000");
})
console.log("Sum:", add(2, 3));