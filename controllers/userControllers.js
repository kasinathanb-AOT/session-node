const { v4 } = require('uuid');

const userData = [];

function generateError(message) {
  return { error: message };
}

const renderPage = (req, res, error) => {
  if (req.session.user) {
    req.session.error = null;
    res.render("index", { user: req.session.user, error });
  } else {
    res.redirect("/login");
  }
};

const indexPage = (req, res, error) => {
  if (req.session.user) {
    req.session.error = null;
    res.render("index", { user: req.session.user, error });
  } else {
    res.redirect("/login");
  }
};

const signUp = (req, res, error) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    const errorMessage = req.session.error; 
    req.session.error = null; 
    res.render("signup", { error: errorMessage || error });
  }
};

const login = (req, res, error) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    const errorMessage = req.session.error; 
    req.session.error = null; 
    res.render("login", { error: errorMessage || (error ? error.error || "" : "") });
  }
};

const userSignUp = (req, res) => {
  const { name, userName, password, phoneNumber } = req.body;
  
  let error = generateError(null); 

  const existingUser = userData.find((user) => user.userName === userName);

  if (existingUser) {
    error = generateError("Username already exists");
    req.session.error = "Username already exists"; 
    res.redirect("/signup");
  } else if (name && userName && password && phoneNumber) {
    const id = v4();
    const newUser = {
      id,
      name,
      userName,
      password,
      phoneNumber,
    };
    req.session.user = newUser;
    userData.push(newUser);
    res.redirect("/");
  } else {
    error = generateError("All fields are required");
    req.session.error = "All fields are required"; 
    res.redirect("/signup");
  }
};

const userLogin = (req, res) => {
  const { username, password } = req.body;

  let error = generateError(null); 

  if (username && password) {
    const user = userData.find(i => i.userName === username && i.password === password);
    if (user) {
      req.session.user = user;
      res.redirect("/");
    } else {
      error = generateError("Invalid credentials");
      req.session.error = "Invalid credentials"; 
      res.redirect("/login");
    }
  } else {
    error = generateError("Invalid credentials");
    req.session.error = "Invalid credentials"; 
    res.redirect("/login");
  }
};

const userLogout = (req, res) => {
  req.session.user = null;
  res.redirect("/login");
};


// const deleteUser = (req, res) => {
//   if (req.session.user) {
//     const id  = req.session.user.id;

//     const user = userData.find(i => i.id === id);

//     if (user) {
//       const updatedUser = userData.filter(i => i.id !== id);
//       req.session.user = null;
//       res.redirect("/login");
//     } else {
//       req.session.error = "User not found";
//       res.redirect("/");
//     }
//   } else {
//     req.session.error = "You need to be logged in to delete a user";
//     res.redirect("/login");
//   }
// };


module.exports = {
  userSignUp,
  userLogin,
  userLogout,
  // deleteUser,
  login,
  signUp,
  indexPage,
  renderPage,
};