const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json(
    { "name": "Akshay Kumar",
      "age": 23,
      "city": "New Pune" 
    }  )})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})