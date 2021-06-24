const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/customer",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}
).then( () => {
console.log(" connection is successful");
}).catch((e) => { console.log("no connection")})