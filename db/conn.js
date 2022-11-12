   
// database connections
const mongoose = require("mongoose");
require("dotenv").config();

const uri = 'mongodb+srv://jwtuser:pass%4011@cluster0.vzhly.mongodb.net/RohitFileStore';
mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then((data) => {
    console.log("DB is connected..");
}).catch((err) => {
    console.log(err);
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Database connected sucessfully");
})