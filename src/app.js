const express = require("express");
const app = express();
const port = 5000;

app.get("/user", (req, res) => {
  res.send({
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
  });
});

app.post("/user", (req, res) => {
  res.send("User created successfully");
});

app.put("/user/:id", (req, res) => {
  res.send(`User with id ${req.params.id} updated successfully`);
});

app.delete("/user/:id", (req, res) => {
  res.send(`User with id ${req.params.id} deleted successfully`);
});

app.get(/^\/ab?c$/, (req, res) => {
  res.send("This is a test route");
});

app.get(/^\/xy+z$/, (req, res) => {
  res.send("This is another test route");
});
app.get(/^\/te*st$/, (req, res) => {
  res.send("This is yet another test route with a wildcard");
});

app.get('/lalit/:id/:name/:age', (req, res) => {
  res.send(`This is a test route for user with id ${req.params.id}, name ${req.params.name}, and age ${req.params.age}`);
});


app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
