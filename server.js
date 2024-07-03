const express = require("express");
const router = require("./routes/user"); 
const session = require("express-session");
const cors = require("cors");

const server = express();

const corsOptions = {
  origin: '*',
  methods: 'GET, POST',
};

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: false }));
server.set("view engine", "ejs");
server.use(express.json());

server.use(
  session({
    secret: 'keyboard cat',
    cookie: {},
  })
);

server.use(router);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
