const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const productosRoutes = require("./routes/productos");
const uploadRoutes = require('./routes/upload');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/productos', productosRoutes);
app.use('/api/upload', uploadRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB conectado");
})
.catch((err)=>{
    console.log("Error MongoDB:", err);
});

app.get("/", (req,res)=>{
    res.send("API Anime Xtremo funcionando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en puerto " + PORT);
});