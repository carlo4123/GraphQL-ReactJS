const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema =require("./schema/schema")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

//allow cross-origin requests
app.use(cors())


//carlo4123@treeheir.com|Cominguez4123 //mongodb
//mongodb+srv://Carlo4123:<password>@cluster0.4cywp.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://Carlo4123:Carlo4123@cluster0.4cywp.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })
mongoose.connection.once('open', () =>{
    console.log("connected to mongoose database")
})
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = 4000
app.listen(PORT, ()=>{
    console.log("Now listening for request on PORT " + PORT)
})