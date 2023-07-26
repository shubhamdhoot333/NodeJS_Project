const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");
const app = express();

let message = "this is my mesage ";
//schema  and query 
const schema = buildSchema(`
type Post{
    userId: Int
    id: Int
    title:String
    body:String
}
type User {
    name:String
    email:String
    age:Int
}
type Query  {
   hello: String
   welcome(name:String):String
   getUser :User
   getPostsFromExternalApis:[Post]
   message:String
}

type Mutation {
    setMessage(newMessage: String): String
  }
`);

//resolver
const root = {
    hello: () => { return 'Hello GraphQL  From meside !!' },
    welcome: (args) => { return 'Hello GraphQL in user !!' + args.name },
    getUser: () => {
        const user = { "name": "shubham", "email": "shubham", "age": 11 }
        return user
    },
    //read data from api 
    getPostsFromExternalApis: async () => {
        return await axios.get("https://jsonplaceholder.typicode.com/posts").then(result => result.data)
    },
    setMessage: ({ newMessage }) => {
        message = newMessage;
        return message;
    },
    message: () => {
        return message;
    }
};

app.use('/graphql', graphqlHTTP({
    graphiql: true, //playground 
    schema: schema, //schema 
    rootValue: root//resolver 
}));


app.listen(3000, () => console.log("port run at 3000"));