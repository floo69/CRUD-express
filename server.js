import express from "express";

const app = express()


app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(3000, () => {
    console.log(`Node API is running on port 3000 `)
})

