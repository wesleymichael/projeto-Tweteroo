import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const users = [];
const tweet = [];

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    const newUser = { username, avatar };

    users.push(newUser);
    
    res.send("OK");
});

app.post("/tweets", (req, res) => {
    res.send("rota criada");
});

app.get("/tweets", (req, res) => {
    res.send("rota criada");
});


app.listen(PORT, () => console.log(`Running server on port ${PORT}`));