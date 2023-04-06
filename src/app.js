import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    //const newUser = { username, avatar };
    users.push( { username, avatar } );
    res.send("OK");
});

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    const isRegistered = users.some( (t) => t.username === username );

    if(!isRegistered){
        res.status(401).send("UNAUTHORIZED");
        return;
    }
    tweets.push( {username, tweet} );
    res.send("OK");
});

app.get("/tweets", (req, res) => {
    res.send("rota criada");
});


app.listen(PORT, () => console.log(`Running server on port ${PORT}`));