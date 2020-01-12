const tmi = require('tmi.js');
const fs = require("fs")
const https = require("https")
const fetch = require("node-fetch");

// Define configuration options
const opts = {
  identity: {
    username: "twitchtradesstocks",
    password: "oauth:0muh8mc6n52jkec8jqidu4btqy4000"
  },
  channels: [
    "twitchtradesstocks"
  ]
};

const VOTES = [];

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// const TIMER_CAP = 10000;
// 
// var MILLIS_UNTIL_SUBMIT_VOTES = TIMER_CAP;
// 
//
setInterval(submitVotes, 60000);

function say(s) {
    console.log(`Sent string to channel: ${s}`);
    client.say("#twitchtradesstocks", s);
}

function submitVotes() {
    fetch("http://localhost:8888/submitVotes", {
        body: JSON.stringify(VOTES),
        method: "POST"
    });
    say("Submitted votes.");
    clearVotes();
}

function buy(s, a) {
	fetch("http://localhost:8888/buy", {
		method: "POST",
		body: JSON.stringify({
			"ticker": s,
			"amount": a
		})
	})
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    console.log(target);
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    var allCommandArgs = msg.trim().split(" ");
    console.log(allCommandArgs);
    if (allCommandArgs.length < 1) {
        console.log("Empty command");
        return;
    }
    const commandName = allCommandArgs[0];
    console.log(`* Candidate command name is '${commandName}`);

    // If the command is known, let's execute it
    if (commandName === '!dice') {
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
    } else if (commandName == "!buy") {
        if (allCommandArgs.length > 2) {
            var stockName = allCommandArgs[1];
            var amount = parseInt(allCommandArgs[2]);
            console.log(`Buying ${amount} shares of ${stockName}`);
	    buy(stockName, amount);
            // voteForStock(stockName);
            // Dispatch
        } else {
            console.log("Not enough arguments provided for buy command");
        }
    } else if (commandName == "!debug") {
        client.say(target, `Current state of votes: ${VOTES}`);
    } else if (commandName == "!clearVotes") {
        clientVotes();
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
}

function voteForStock(stockName) {
    VOTES.push(stockName);
}

function clearVotes() {
    while(VOTES.length > 0) {
        VOTES.pop();
    }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
