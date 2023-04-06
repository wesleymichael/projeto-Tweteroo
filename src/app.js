import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 5000;

const user = {
    username: "",
    avatar: "",
}

const tweet = {
    username: user.username,
    tweet: "",
}

app.post("/sign-up", (req, res) => {
    res.send("rota criada");
});

app.post("/tweets", (req, res) => {
    res.send("rota criada");
});

app.get("/tweets", (req, res) => {
    res.send("rota criada");
});


app.listen(PORT, () => console.log(`Running server on port ${PORT}`));