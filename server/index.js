const { error } = require('console');
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const recipe = require('./routes/Recipe');
const adminRoutes = require('./routes/adminRoutes');


const app = express()

//MiddleWare goes here
// Middleware

//MongoDB Connection goes 2nd

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Conneced to MongoDB...'))
.catch(() => console.error('Failed to connect',error))


//Routes

app.use(express.json());
app.use(cors());
app.use('/api/recipes', recipe);
app.use('/api', adminRoutes);

const port = process.env.PORT || 3000;


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})