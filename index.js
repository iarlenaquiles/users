const express = require("express");

const server = express();

server.use(express.json());

const users = ["Diego", "Iarlen"];

server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  return next();
});

checkUserExists = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "username is required" });
  }

  return next();
};

checkUserExistsInArray = (req, res, next) => {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "user doesn't exist" });
  }

  req.user = user;

  return next();
};

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserExistsInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put(
  "/users/:index",
  checkUserExists,
  checkUserExistsInArray,
  (req, res) => {
    const { name } = req.body;
    const { index } = req.params;

    users[index] = name;
    return res.json(users);
  }
);

server.delete("/users/:index", checkUserExistsInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  return res.send();
});

server.listen(3000);
