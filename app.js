const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./service.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const userRouter = require('./routers/userRouters');

app.use('/api/user', userRouter);

mongoose.connect(config.MONGODB_SERVER)
         .then(()=> console.log("Connected to MongoDB!"))
         .catch(err => {
            console.log("MongoDB connection failed", err.message)
         });

const port = config.PORT || 6000;
app.listen(port, (err)=>{
   if(err){
      console.log("Server failed to start:", err.message);
   }
   console.log(`Listening on port ${port}`);
});