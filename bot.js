var TelegramBot = require('node-telegram-bot-api')
  , scheduler = require('node-schedule')
  , _ = require('lodash');

var token = process.env.TOKEN || require('./config.json').TOKEN;

// Setup polling way
var bot = new TelegramBot(token, {polling: true});

bot.getMe().then(function (me) {
    console.log('my name is %s!', me.username);
});

bot.on('message', function (msg) {
    console.log('i done got me a message folks, from: ' + msg.from.username);
    console.log('it says: ' + msg.text);
    // MESSAGE
    // {
    //     "message_id":4447,
    //     "from":
    //          {
    //             "id":69321571,
    //             "first_name":"alex",
    //             "last_name":"dubya",
    //             "username":"booninite"
    //          },
    //      "chat":
    //          {
    //             "id":69321571,
    //             "first_name":"alex",
    //             "last_name":"dubya",
    //             "username":"booninite"
    //          },
    //      "date":1438229693,
    //      "text":"hi"
    // }

    if (msg.text.indexOf('hearthstone') !== -1) {
        bot.sendMessage(msg.chat.id, "hearthstone?  @gnarnia plays hearthstone if you consider being anally gangraped by wizards 'playing'")
    }

    var chatId = msg.chat.id;
});
