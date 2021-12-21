const discord = require('discord.js');
const client = new discord.Client();
const {token} = require('./config.json');
const prefix = "g. ";

client.on('ready', async () => {
    console.log(':troll:');
});

client.on('message', async (message) => {
    const channel = message.channel;
    var u_messages = [];
    if(channel.id=='748563164362440856'){ //restricts channels able to use it, change it to if(true) for global access
        if(message.content.startsWith(prefix)){
            var um = await fetch_msg(message, client);
            var um_content = um.map(el => el.content);
            let mention = message.mentions.users.first();
            if (!mention) mention = message.author;
            message.channel.send(`${mention} : ${gen_msg(um_content)}`);
        }
    }
});

const fetch_msg = async (message, client) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let mention = message.mentions.users.first();
    if (!mention) mention = message.author;
    var um = [];
    var n_um = [];
    var lm_id;
    await message.channel.fetchMessages({limit:100}).then(async msgs=>{
        lm_id = msgs.first().id;
    });
    while(n_um.length<100){ //number of messages to fetch, changing it to more can cause the bot to become slower
        await message.channel.fetchMessages({limit:100, before:lm_id}).then(async msgs=>{
            msgs.forEach(async msg =>{
                um.push(msg);
            });
            lm_id = um[um.length-1].id;
            for(var i = 0; i < um.length; i++){
                if(um[i].author.id==mention.id)n_um.push(um[i]);
            }
        });
    }  
    return n_um;
}

gen_msg = (messages)=>{
    var messages_flat = messages.join(' ');
    var words = messages_flat.split(/ +/g);
    var length = Math.floor(Math.random()*5+10);
    var sentence = [];
    for(var i=0; i<length; i++){
        var index = Math.floor(Math.random()*words.length);
        sentence.push(words[index]);
    }
    return sentence.join(' ');
}

client.login(token); //change it to your token
