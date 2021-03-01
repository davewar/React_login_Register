const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser')
const cors = require('cors');

require('dotenv').config();
const app = express();


app.use(bodyparser.json())
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials:true}))

app.use(authRoutes)



// database connection
 mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} ,()=>{
        console.log("connected");
})


// routes 
app.use(authRoutes);

let port = 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});