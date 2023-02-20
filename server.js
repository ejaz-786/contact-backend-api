const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json()); /*for parsing the object in json */
app.use('/api/contacts',require("./routes/contactRoutes"));  // contact routes
app.use('/api/users',require("./routes/userRoutes"));    // user routes ( Authentication )

app.use(errorHandler);  // middleware for error handling 

app.listen(port,()=> {
    console.log(`app is runnig on port ${port}`);
})

