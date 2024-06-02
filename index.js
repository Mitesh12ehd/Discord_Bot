const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const shortid = require("shortid")

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json());

//connect mongodb database
mongoose
    .connect(process.env.MONGODB_STRING)
    .then( () => console.log("MongoDb Connected"))
    .catch( (err) => console.log("Mongo Error",err));


//define schema
const urlSchema = mongoose.Schema(
    {
        shortId : {
            type: String,
            required: true,
            unique : true
        },
        redirectUrl : {
            type: String,
            required: true,
            unique : true
        }
    }
);
const URL = mongoose.model("URL",urlSchema);

function generateShortUrl(originalurl){
    //generate random id
    const short_Id = shortid(8);

    const original = originalurl.trim();
    //create entry in db
    URL.create({
        shortId : short_Id,
        redirectUrl : original
    });

    return short_Id;
}

app.get("/:short_id",async (req,res) => {
    const shortId = req.params.short_id;

    const entry = await URL.findOne({shortId});
    console.log(entry);
    //redirect user
    res.redirect(entry.redirectUrl);
})


const { Client, GatewayIntentBits } = require('discord.js');

//create a client that have access to guild,
//have access of guild messages to create message and message content
//go to https://discord.com/developers/docs/topics/gateway#list-of-intents
//to read other type of guild permission
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    }
);

//when message is created run given callback
//try to print whole message body
client.on("messageCreate", (message) => {
    console.log(message.content);
});

client.on("messageCreate", (message) => {
    if(message.author.bot){
        //to avoid bot reply on its own message infinitly
        return;
    }

    //for url
    if(message.content.startsWith("create")){
        const url = message.content.split("create")[1];
        const short_unique_id = generateShortUrl(url);
        return message.reply({
            content : "short link is " + "http://localhost:8000/" + short_unique_id
            // content : "Generating short id for " + url
        })
    }

    message.reply({
        content: "Hi from bot"
    })
});

//for command
client.on("interactionCreate",(interaction) => {
    console.log(interaction);
    interaction.reply("Pong!!");
})

client.login(
    "MTI0NTk0NzA1ODU1MzA5NDIwNg.GOCCi3.e3RkMIzrnpWpPESVNCDD29H6IjXjDMhtf6tsi8"
);

app.listen(PORT,() => {
    console.log(`server started at ${PORT}`);
})