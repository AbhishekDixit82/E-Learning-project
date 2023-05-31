const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/techvectorvolume', {
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.log("Error connecting to MongoDB:", error);
});
