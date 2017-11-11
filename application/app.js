const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
let port = 3000;

var db = require('../lib/jsonfs.js');

//db.connect('db', ['User']);
db.connect('db', ['Todos']);

/* Here a simple schema is constructed using the GraphQL schema language (buildSchema). 
   More information can be found in the GraphQL spec release */

let schema = buildSchema(`
  type Query {
    id: String,
    fName: String,
    lName: String,
    email: String,
    pincode: Int,
    birthDate: String,
    isActive: Boolean
  }
`);

// Root provides a resolver function for each API endpoint
let root = {
  id: () => {
    return "objectid-1";
  },
  fName: () => {
    return 'Bala';
  },
  lName: () => {
    return 'sundar';
  },
  email: () => {
    return "32deva@gmail.com";
  },
  pincode: () => {
    return 60008;
  },
  birthDate: () => {
    return "02-MAR-2017";
  },
  isActive: () => {
    return true;
  }
  
};

const app = express();
//db.connect('db', ['User']);

app.get("/insert",function(req,res){
     
     var User = {
    fName: "Bala",
    lName: "sundar",
    email: "32deva@gmail.com",
    pincode: "60008",
    birthDate: new Date("02-MAR-2017"),
    isActive: true
}

var User2 = {
    fName: "Sambath",
    lName: "sundar",
    email: "32deva@gmail.com",
    pincode: "60008",
    birthDate: new Date("02-MAR-2017"),
    isActive: true
}

var User3 = {
    fName: "Anand",
    lName: "sundar",
    email: "32deva@gmail.com",
    pincode: "60008",
    birthDate: new Date("02-MAR-2017"),
    isActive: true
}

var Todos = {
    userid: "01c44f979dda4b6bb5964eef32fc8f83",
    text: "Hi Intelect",
    done: true,
    birthDate: new Date()
}

//var savedUser = db.User.save(User);
//var savedUser = db.User.save([User]);
//var savedUser = db.User.save([User, User2, User3]);

var savedUser = db.Todos.save([Todos]);

console.log(savedUser);
      
      res.end("Saved");
});

app.get("/api/users",function(req,res){
     var User = db.User.find();
     console.log(User);
     res.send(User);
    // var User = db.User.aggregate([
    //         // Join with user_info table
    //         {
    //             $lookup:{
    //                 from: "User",       // other table name
    //                 localField: "_id",   // name of users table field
    //                 foreignField: "userid", // name of userinfo table field
    //                 as: "user_info"         // alias for userinfo table
    //             }
    //         }
    // ]).toArray(function(err,result){
    //     console.log(result);
    // });
    // res.end("");
});

app.get("/api/user/active/:id",function(req,res){
      var User = db.User.findOne({"_id":req.params.id,"isActive":true});
      //console.log(User);
      res.send(User);
});

app.get("/api/user/:id",function(req,res){

      
      var User = db.User.findOne({"_id":req.params.id});
      //console.log(User);
      res.send(User);
});

app.get("/api/today/user/:id",function(req,res){
      var User = db.User.findOne({"_id":req.params.id});
      //console.log(User);
      res.send(User);
});

app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false //Set to false if you don't want graphiql enabled
}));


app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);