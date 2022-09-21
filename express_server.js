const express = require("express");
const app = express();
const PORT = 3001; // default port 8080

const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
};
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs")

const urlDatabase = {
  "b2xVn2": "https://www.lighthouselabs.ca",
  "9sm5xK": "https://www.google.com", 
};
app.post("/urls", (req, res) => {
  // console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id]
  
  const templateVars = {  
    user: users[req.cookies["user_id"]],
  urls: urlDatabase};

  res.render("urls_index", templateVars); // Respond with 'Ok' (we will replace this)
});
app.post("/urls/:id", (req, res) => {
   urlDatabase[req.params.id] = req.body.longURL
  const templateVars = {  
    user: users[req.cookies["user_id"]],
  urls: urlDatabase};

  res.render("urls_index", templateVars); // Respond with 'Ok' (we will replace this)
});

app.post("/login", (req, res) => {

  const templateVars = {  
  user: null,
  urls: urlDatabase};

 res.render("urls_index",templateVars); // Respond with 'Ok' (we will replace this)
});

app.post("/logout", (req, res) => {
  res.clearCookie('user_id');
  const templateVars = {  
   user: null,
   urls: urlDatabase};
 
  res.render("urls_index",templateVars); // Respond with 'Ok' (we will replace this)
 });


app.get("/urls", (req, res) => {
   
  console.log("VAL",   users[req.cookies["user_id"]],
  );
  const templateVars = { 
    user: users[req.cookies["user_id"]],

  urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/register", (req, res) => {
  const templateVars = { 
    user: null ,
  urls: urlDatabase};
  res.render("form.ejs", templateVars);
});

app.post("/register", (req, res) => {

  const { password, email } = req.body
  const randomId = generateRandomString()
  const newUser = {
    [randomId]: {
    id: randomId,
    email: email,
    password: password,
  }}
  Object.assign(users, newUser)
  res.cookie('user_id', randomId);
  const templateVars = { 
    user: users[randomId],
  urls: urlDatabase};
  res.render("urls_index", templateVars);

});

app.get("/u/:id", (req, res) => {
 
  const longURL = urlDatabase[req.params.id]
  res.render(longURL);
}); 
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
}); 
app.get("/urls/:id", (req, res) => {
  const templateVars = { 
    user: users[req.cookies["user_id"]],
     id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
}); 

// app.get("/urls.json", (req, res) => {
//     res.json(urlDatabase);
//   });
                      

  // app.get("/hello", (req, res) => {
  //   res.send("<html><body>Hello <b>World</b></body></html>\n");
  // });                         
  // app.get("/set", (req, res) => {
  //   const a = 1;
  //   res.send(`a = ${a}`);
  //  });
   
  //  app.get("/fetch", (req, res) => {
  //   res.send(`a = ${a}`);
  //  });
  app.get("/", (req, res) => {
    res.send("Hello!");
  });
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});



const generateRandomString = function (){
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var length = 10
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
 }
 return result;
}


