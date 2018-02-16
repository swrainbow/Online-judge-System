var  express = require("express")
var   app = express()
var restRouter = require("./routes/rest")
var path = require('path');
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
mongoose.connect("mongodb://user:user@ds233218.mlab.com:33218/coj");

app.use(express.static(path.join(__dirname,'../public')));

app.use('/',indexRouter);
app.use("/api/v1",restRouter);


app.use(function (req,res) {
    res.sendFile("index.html",{root:path.join(__dirname,'../public/')});
})
app.listen(3000,function () {
    console.log('App listening on port 3000!')
})