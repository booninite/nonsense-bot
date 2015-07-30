var TelegramBot = require('node-telegram-bot-api')
  , scheduler = require('node-schedule')
  , _ = require('lodash');

var token = process.env.TOKEN || require('./config.json').TOKEN;

var msgs = [];
var last_seen = [];

// Setup polling way
var bot = new TelegramBot(token, {polling: true});

bot.getMe().then(function (me) {
    console.log('my name is %s!', me.username);
});

bot.on('message', function (msg) {
    console.log('i done got me a message folks, from: ' + msg.from.username);
    console.log(JSON.stringify(msg));
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

    msgs.push(msg);

    if (msg.text === '/summary' || msg.text === '/summarize') {
        summarizeUser(msg.from.username);
    } else {
        last_seen.push({
            person: msg.from.username,
            time: msg.date
        });
    }

    var chatId = msg.chat.id;
});

// report
scheduler.scheduleJob('0 16 * *', function(){
    console.log('it is time to generate the daily report');
    summarizeTime(24);
});

function summarizeUser(user) {
    console.log('request to summarize user: ' + user);
    var last_time = _.result(_.find(last_seen, function(obj) {
        return obj.person === user;
    }), time);

    console.log('the last time he/she was seen was: ' + last_time);

    var relevant_msgs = _.remove(msgs, function(n) {
        return n.date > last_time;
    });

    console.log(relevant_msgs);
}

function summarizeTime(hours) {

}
