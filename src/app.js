import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const users = [];
const tweets = [];


function isString(str){
    return typeof(str) === 'string';
}

app.post("/sign-up", (req, res) => {   
    const {username, avatar} = req.body;

    if(!username || !avatar ||  !isString(username) || !isString(avatar) ){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    users.push( { username, avatar } );
    res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    const isRegistered = users.some( (t) => t.username === username );

    if(!isRegistered){
        return res.status(401).send("UNAUTHORIZED");
    }
    if(!username || !tweet || !isString(username) || !isString(tweet) ){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    tweets.push( {username, tweet} );
    res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
    const maxTweets = 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    if(page < 1 || isNaN(page)){
        return res.status(400).send("Informe uma página válida!");
    }
    
    const start = (page - 1)*maxTweets;
    const end = start + maxTweets;
    const tweetsPage = tweets.slice(start, end);

    const tweetsWithAvatar = tweetsPage.map( elem => {
        const { username, tweet } = elem;
        const user = users.find( (elem) => elem.username === username );
        return {username, avatar: user.avatar, tweet};
    })
    res.send(tweetsWithAvatar);
});

app.get("/tweets/:username", (req, res) => {
    const username = req.params.username;
    const user = users.find( (e) => e.username === username );

    const tweetsUser = tweets
        .filter(tweet => tweet.username === username)
        .map(tweet => ({ username, avatar: user.avatar, tweet: tweet.tweet }));
    res.send(tweetsUser);
});


app.listen(PORT, () => console.log(`Running server on port ${PORT}`));