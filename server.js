import express from "express";
import mongoose from "mongoose";
import Product from "./Models/productmodel.js";

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/blog', (req, res) => {
    res.send("Hello blog");
});

app.get('/products', async (req, res) => {
    try{
        const product = await Product.find({});
        res.status(200).json(product)
    }
     catch (err) {
        res.status(500).json({message: error.message})
     }
})

// update 
app.get('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    }
    catch (err){
        res.status(500).json({message:error.message})
    }

})

app.post('/Product', async (req, res) => {
    try {
        // The create method is called with req.body, which contains the data sent by the client in the request body (e.g., the product's name, price, description, etc.).
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// update route
app.put('/product/:id', async(req,res) => {
    try {
        const {id} = req.params; //req.params.id
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return  res.status(404).json({message: `Cannot find any product with id ${id}`})
        }
        res.status(200).json(product);

    }
    catch (error){
        res.status(500).json({message:error.message});
    }
})

app.delete('/product/:id', async(req, res) => {
   try{
       const {id} = req.params;
       const product = await Product.findByIdAndDelete(id);
       if(!product){
        return  res.status(404).json({message: `Cannot find any product with id ${id}`})
    }
    res.status(200).json({message:`Product deleted successfully`, product});

    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})

mongoose.connect('mongodb+srv://floyd:1234@cluster0.devrt.mongodb.net/Nodeapi?retryWrites=true&w=majority&appName=Cluster0')
.then(() => { 
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log(`Node API is running on port 3000`);
    });
}).catch((error) => {
    console.log(error);  
});
