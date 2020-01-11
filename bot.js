const tmi = require('tmi.js');
const fs = require("fs")
const https = require("https")

// Define configuration options
const opts = {
  identity: {
    username: "twitchtradesstocks",
    password: "oauth:g9gxyfv1g8uagih242evn5dotwuw00"
  },
  channels: [
    "twitchtradesstocks"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
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
        if (allCommandArgs.length > 1) {
            var stockName = allCommandArgs[1];
            console.log(`Buying ${stockName}`);
            // Dispatch
        } else {
            console.log("Not enough arguments provided for buy command");
        }
    }
    else {
        console.log(`* Unknown command ${commandName}`);
    }
}

function buyStock(ticker) {
    // Get most recent closing price for the ticker
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
