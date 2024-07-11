require("dotenv").config({ path: './config.env' });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

try {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
        .then(() => console.log("Connection Successful!"));
}
catch (err) {
    console.log(err);
}

const userController = require("./Controllers/userController");
const controller = require('./controller');

app.get('/', (req, res) => {
    res.send('Ivy Server is running... 👌✨');
});

app.post("/verify", userController.userVerification);
app.post("/login", userController.login);
app.post("/register", userController.register);

app.post("/career_streaming_new", controller.career_streaming_new);
app.post("/ai_psychiatrist", controller.ai_psychiatrist);

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));