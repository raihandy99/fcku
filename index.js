const PORT = 3000; // PORT WEBSERVER

const ExpressServer = require('./express.js');
const express = require('express');
const app = express();
const sleep = require('delay');
const fs = require('fs');
const socketIO = require('socket.io');

const http = require('http');
const server = http.createServer(app);
const io = socketIO(server,{
    cors: {
            origin: "http://localhost",
            methods: ["GET", "POST"],
            credentials: true,
            transports: ['websocket', 'polling'],
    },
    allowEIO3: true
    });
app.get('/set', ExpressServer.index);
const { 
    withFbns
} = require('instagram_mqtt');
const {
    IgApiClient,
    IgCheckpointError, 
} = require('instagram-private-api');
const {
    promisify
} = require('util');
const {
    writeFile,
    readFile,
    exists,
    existsSync,
    readFileSync,
    unlink,
    fstat
} = require('fs');
const {
    question
} = require('readline-sync')
const chalk = require('chalk');
const Bluebird = require('bluebird');
const inquirer = require('inquirer');
const TelegramBot = require('node-telegram-bot-api');
 

if (!existsSync('config_tele.json')) return console.log(chalk.red(`config_tele.json File Not Found!`))
const config = JSON.parse(readFileSync('config_tele.json', {encoding: 'utf-8'}))
const token = config.token; 

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);
const existsAsync = promisify(exists);
const unlinkAsync = promisify(unlink);

var bigInt = require("big-integer");
const {
    delay
} = require('bluebird');
 
console.log(chalk.yellow(`
█████  ██    ██ ████████  ██████       ██████  ██████  ███    ███ ███    ███ ███████ ███    ██ ████████ 
██   ██ ██    ██    ██    ██    ██     ██      ██    ██ ████  ████ ████  ████ ██      ████   ██    ██    
███████ ██    ██    ██    ██    ██     ██      ██    ██ ██ ████ ██ ██ ████ ██ █████   ██ ██  ██    ██    
██   ██ ██    ██    ██    ██    ██     ██      ██    ██ ██  ██  ██ ██  ██  ██ ██      ██  ██ ██    ██    
██   ██  ██████     ██     ██████       ██████  ██████  ██      ██ ██      ██ ███████ ██   ████    ██    
                                                                                                         
                                                                                                         
- Script Auto Comment Realtime!
- Now support Web based ( Change comment, Change Target, Toogle active/deactive bot ) ( Daily Limit )
`));
fs.writeFileSync("logger.txt", "");
const IG_USERNAME = question(`- IG Username : `);
const check_Profile = fs.existsSync(IG_USERNAME + '.json')
check_Profile == true ? console.log(chalk.green(`Session found skipping password!`)) : console.log(chalk.red(`Session not found! required password!`))
const IG_PASSWORD = check_Profile == false ? question(`- IG Password : `) : false;
var limit_today = 1; //Limit
var delay_limit = 1; //Limit

const nama_comment = "komen.txt";
const nama_target = "target.txt";
const nama_filter = "filter.txt";
const tanya_khusus = "y";

let auto_like =  question(`- Auto Like By DB? y/n : `);

const notif_tele =  question(`- Notif Tele? y/n : `);
const chatId_tele = notif_tele == 'y' ? config.chatId : '';
const telegram_bot = notif_tele == 'y' ? new TelegramBot(token, {
    polling: true
}) : null;
async function start(nama_khusus = null,teks_khusus = null,chalk,Bluebird,inquirer,TelegramBot,config,token,writeFileAsync,readFileAsync,existsAsync,unlinkAsync,bigInt,delay,IG_USERNAME,IG_PASSWORD,limit_today,delay_limit,nama_comment,nama_target,nama_filter,tanya_khusus,auto_like,notif_tele,chatId_tele,telegram_bot,status = 0){
    if(status == 0){
        server.listen(PORT, () => console.log('Server Running at http://localhost:3000'));
        }else{
        console.log(chalk.red.bgYellow.bold("Changes in Setting detected Re launch Apps\r\n"));
        }

            function doEmit(socket){
                socket.emit('target',fs.readFileSync('./target.txt',{ encoding: 'utf8' }));
                socket.emit('komen',fs.readFileSync('./komen.txt',{ encoding: 'utf8' }));
                socket.emit('filter',fs.readFileSync('./filter.txt',{ encoding: 'utf8' }));
                socket.emit('targetKhusus',fs.readFileSync('./targetKhusus.txt',{ encoding: 'utf8' }));
                socket.emit('komenKhusus',fs.readFileSync('./komenKhusus.txt',{ encoding: 'utf8' }));
                socket.emit('limit',limit_today);
                socket.emit('delay',delay_limit);
                socket.emit('logger',fs.readFileSync('./logger.txt',{ encoding: 'utf8' }));

                if(limit_today == 0)
                {
                  socket.emit('status', 0);

                }else{
                socket.emit('status', 1);
                }

            }
            
            io.on('connection', (socket) => {
            
                socket.emit('message', 'connecting');
                doEmit(socket);
                socket.emit('message', 'connected');
                socket.on('refresh',function(data){
                socket.emit('logger',fs.readFileSync('./logger.txt',{ encoding: 'utf8' }));
                });
                socket.on('update',function(data){
                    Object.entries(data).forEach(([key, val]) => {
            
                        switch(key){
                                case "limit":
                                    limit_today = val;
                                    break;
                                    case "delay":
                                        delay_limit = val;
                                        break;
                            default:
                                fs.writeFileSync("./"+key+".txt", val);
                        }
    
                      });
                      doEmit(socket);
                      if(limit_today == 0)
                      {
                        fs.writeFileSync("logger.txt", "");
                        socket.emit('status', 0);

                      }else{

                      socket.emit('status', 1);
                      }

                      socket.emit('message', 'updated');
                      return start(nama_khusus,teks_khusus,chalk,Bluebird,inquirer,TelegramBot,config,token,writeFileAsync,readFileAsync,existsAsync,unlinkAsync,bigInt,delay,IG_USERNAME,IG_PASSWORD,limit_today,delay_limit,nama_comment,nama_target,nama_filter,tanya_khusus,auto_like,notif_tele,chatId_tele,telegram_bot
                        ,1)
                })
              });




if(tanya_khusus == "y"){
    const read_targetkhusus = await readFileAsync(nama_khusus, {
        encoding: 'utf-8'
    })
    const read_tekskhusus = await readFileAsync(teks_khusus, {
        encoding: 'utf-8'
    })
    var targetKhusus = read_targetkhusus.includes('\r\n') ? read_targetkhusus.split('\r\n') : read_targetkhusus.split('\n')
    var teksKhusus = read_tekskhusus.includes('\r\n') ? read_tekskhusus.split('\r\n') : read_tekskhusus.split('\n');
}
    const read_comment = await readFileAsync(nama_comment, {
        encoding: 'utf-8'
    })


    var comment = read_comment.includes('\r\n') ? read_comment.split('\r\n') : read_comment.split('\n')

    const read_target = await readFileAsync(nama_target, {
        encoding: 'utf-8'
    }) 
    var target = read_target.includes('\r\n') ? read_target.split('\r\n') : read_target.split('\n')

    const read_filter = await readFileAsync(nama_filter, {
        encoding: 'utf-8'
    })
    var filter = read_filter.includes('\r\n') ? read_filter.split('\r\n') : read_filter.split('\n') 

    var database = auto_like == 'y' ? fs.readdirSync('./cookies').filter(x => {
        return x.includes('.json') && x != 'undefined.json'
    }) : false;

    if(database.length == 0) {
        auto_like = 'n'
        console.log(chalk.red(`Cookies not found, skipping auto like by db!`))
    }
    
    const ig = withFbns(new IgApiClient());
    ig.state.generateDevice(IG_USERNAME); 
    
    check_Profile == true ? await readState(ig, IG_USERNAME) : false;

    check_Profile == false ? await login(ig, IG_USERNAME) : false;

    let action = 0;
    let enabled = 1; 
    ig.fbns.on('push', async (push) => {

        try {   
            if (push.pushCategory && push.pushCategory == 'post') {
                if (target.includes(push.message.split(' ')[0])) {
                    if (action >= parseInt(limit_today, 10)) {

                        const logs = `Max action reached ! Delay ${delay_limit} seconds`
                        console.log(chalk.red(logs))
                        if (notif_tele == 'y') await telegram_bot.sendMessage(chatId_tele, logs)
                        enabled = 0;
                        await delay(parseInt(delay_limit, 10) * 60000);
                        action = 0;
                    }
                    if(limit_today == 0)
                    {
                        enabled = 0;
                    }else{
                        enabled = 1;
                    }
                    if (enabled) {
                        const checkInfo = await ig.media.info(push.actionParams.media_id)    
                        if(checkInfo.items[0].caption == null || checkInfo.items[0].caption != null && ArrayIncludes(filter, checkInfo.items[0].caption.text) != true)
                        {
                            var timeNow = new Date();
                            timeNow = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`
if(tanya_khusus == 'y')
{

if(targetKhusus.includes(push.message.split(' ')[0]))
{
    var key = targetKhusus.indexOf(push.message.split(' ')[0]);

    if(teksKhusus[key].includes('|'))
    {

        var textKhusus = teksKhusus[key].split('|');
        var text = getRandomText(textKhusus);

    }else
    {
        var text = teksKhusus[key]; 
    }
}else{
    var text = getRandomText(comment);
}

}else
{

    var text = getRandomText(comment);
}
                            const publishComment = await ig.media.comment({
                                mediaId: push.actionParams.media_id,
                                text: text
                            }).catch(x => console.log(x.toString()))
                            const publishLike = await ig.media.like({
                                mediaId: push.actionParams.media_id,
                                moduleInfo: {
                                    module_name: 'profile'
                                }
                            }).catch(x => console.log(x.toString()))
                            action++
                            const log = `------[${timeNow}]------ \n${push.message}\nLike -> [ ${publishLike && publishLike.status =='ok' ? 'success': 'failed'} ] \nComment -> [ ${publishComment && publishComment.status == 'Active'?text:'failed'} ] \nUrl -> ${getInstagramUrlFromMediaId(push.actionParams.media_id)}\nUser -> ${push.message.split(' ')[0]} | Action Success ${action}\n-----------------------\nWaiting new post . . .\n\n`

                            fs.appendFileSync('logger.txt', log)


                            if (notif_tele == 'y') await telegram_bot.sendMessage(chatId_tele, log)
                            console.log(chalk.magenta(log))
                            if(auto_like == 'y' && publishComment.status == 'Active')
                            {
                                console.log(chalk.yellow(`-> Proccess auto like db | Total ${database.length} Akun.`))
                                let total_like = 0;
                                let total_gagal = 0;
                                for(let i = 0;i < database.length;i++)
                                {
                                   try {
                                        const username = database[i].split('.json')[0]
                                        const cookies = await readFileAsync('./cookies/' + database[i], {
                                            encoding: 'utf-8'
                                        });

                                        const ig = withFbns(new IgApiClient());
                                        ig.state.generateDevice(username); 
                                        await ig.importState(cookies);
                                        try {
                                            const like = await ig.media.likeComment(publishComment.pk);
                                            if(like.status == 'ok') {
                                                console.log(`-> @${username} success like.`)
                                                total_like++
                                            }
                                        } catch (error) {
                                            if((error.toString()).includes('login_required')){
                                                console.log(`-> @${username} failed like. Cookies Expired! Please get cookies again!. List expired saved to cookies_expired.txt`);
                                                await unlinkAsync('./cookies/' + database[i]);
                                                fs.appendFileSync('cookies_expired.txt', `[${timeNow}] ${username}\n`)
                                                total_gagal++


                                            }else{
                                                console.log(chalk.red(`-> @${username} failed like. Reason -> ${error.toString()}`));
                                                total_gagal++
                                            }
                                            
                                        }
                                       
                                   } catch (error) {
                                        console.log(error.toString())
                                   }
                                }
                                console.log(chalk.green(`-> Proccess auto like db DONE | Total ${total_like} Like Success`), chalk.red(`| Total ${total_gagal} Like Failed`))
                            }
                        }else{
                            var timeNow = new Date();
                            timeNow = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`
                            const log = `------[${timeNow}]------ \n${push.message}\nLike -> [ filter detected ] \nComment -> [ filter detected ] \nUrl -> ${getInstagramUrlFromMediaId(push.actionParams.media_id)}\nUser -> ${push.message.split(' ')[0]}\n-----------------------\nWaiting new post . . .\n`
                            if (notif_tele == 'y') await telegram_bot.sendMessage(chatId_tele, log)
                            console.log(chalk.red(log))
                        }
                        
                    }
    
                }
            }   
        } catch (error) {
            console.log(error)
        }
    });


    ig.fbns.on('auth', async (auth) => {  
        //console.log(auth)
        if(limit_today <= 0)
        {
            console.log('Script not activated !');
        }else{
        console.log(chalk.green('Login success . . . ' + auth.userId))
        console.log(chalk.yellow(`Delay limit -> [ ${delay_limit} ]`))
        console.log(chalk.yellow(`Daily limit -> [ ${limit_today} ]`))
        console.log(chalk.yellow(`Detected Count Target -> [ ${target.length} ]`))
        console.log(chalk.yellow(`Detected Count Comment -> [ ${comment.length} ]`))
        console.log(chalk.green('Waiting new post . . . \n'))
        if (notif_tele == 'y') await telegram_bot.sendMessage(chatId_tele, `Login Success !\nDetected Count Target -> [ ${target.length} ]\nDetected Count Comment -> [ ${comment.length} ]`)
        await saveState(ig, IG_USERNAME);
        }
    });

    ig.fbns.on('error', async (err) => { 
        console.log(err)
    });

    ig.fbns.on('warning', async (warning) => {
        console.log(warning)
    });

    ig.fbns.on('disconnect', async (dc) => {
        console.log(dc) 
    });

    await ig.fbns.connect();   

}











(async () => {


    try {
        if(tanya_khusus == 'y')
        {
            const nama_khusus = "targetKhusus.txt";
            const teks_khusus = "komenKhusus.txt";
            if (!await existsAsync(nama_khusus)) return console.log(chalk.red(`@TargetKhusus File Not Found!`))
            if (!await existsAsync(teks_khusus)) return console.log(chalk.red(`@komenKhusus File Not Found!`))
            start(nama_khusus,teks_khusus,chalk,Bluebird,inquirer,TelegramBot,config,token,writeFileAsync,readFileAsync,existsAsync,unlinkAsync,bigInt,delay,IG_USERNAME,IG_PASSWORD,limit_today,delay_limit,nama_comment,nama_target,nama_filter,tanya_khusus,auto_like,notif_tele,chatId_tele,telegram_bot,0
                );
        
        }else{

        if (!await existsAsync(nama_comment)) return console.log(chalk.red(`@Comment File Not Found!`))
        if (!await existsAsync(nama_target)) return console.log(chalk.red(`@Target File Not Found!`))
        if (!await existsAsync(nama_filter)) return console.log(chalk.red(`@Filter File Not Found!`))

        start(null,null,chalk,Bluebird,inquirer,TelegramBot,config,token,writeFileAsync,readFileAsync,existsAsync,unlinkAsync,bigInt,delay,IG_USERNAME,IG_PASSWORD,limit_today,delay_limit,nama_comment,nama_target,nama_filter,tanya_khusus,auto_like,notif_tele,chatId_tele,telegram_bot,0);

        }

    } catch (error) {
        console.log(error)
        if((error.toString()).includes('login_required')){
            console.log(chalk.red('Please Login Again!'))
            await unlinkAsync(IG_USERNAME + '.json');
        }
        process.exit()
    }
})();


function ArrayIncludes(a, b)
{
    for(let i = 0; i<a.length;i++)
    {
        if(b.includes(a[i])) return true;
    } 
    return false;
}

function getInstagramUrlFromMediaId(media_id) {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var shortenedId = '';
    media_id = media_id.substring(0, media_id.indexOf('_'));

    while (media_id > 0) {
        var remainder = bigInt(media_id).mod(64);
        media_id = bigInt(media_id).minus(remainder).divide(64).toString();
        shortenedId = alphabet.charAt(remainder) + shortenedId;
    }

    return 'https://www.instagram.com/p/' + shortenedId + '/';
}

function getRandomText(id) {
    var raNdText = id[Math.floor(Math.random() * id.length)];
    return raNdText;
}

async function saveState(ig, profile) {
    return writeFileAsync(profile + '.json', await ig.exportState(), {
        encoding: 'utf8'
    });
}

async function readState(ig, profile) {
    if (!await existsAsync(profile + '.json'))
        return;
    await ig.importState(await readFileAsync(profile + '.json', {
        encoding: 'utf8'
    }));
}

async function login_db(ig, u, p) {
    return new Promise((resolve, reject) => {
        Bluebird.try(async () => { 
            //await ig.simulate.preLoginFlow();
            const auth = await ig.account.login(u, p);
            process.nextTick(async () => await ig.simulate.postLoginFlow());
            resolve(auth)
        }).catch(IgCheckpointError, async () => { 
            resolve('Account Checkpoint! Skipped!');
        }).catch(e => resolve('Account Checkpoint! Skipped!'));
    });
}

async function login(ig, profile) {
    return new Promise((resolve, reject) => {
        Bluebird.try(async () => {
           // ig.request.end$.subscribe(() => saveState(ig, profile));
            //await ig.simulate.preLoginFlow();
            const auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
            process.nextTick(async () => await ig.simulate.postLoginFlow());
            resolve(auth)
        }).catch(IgCheckpointError, async () => {
            console.log(ig.state.checkpoint); // Checkpoint info here
            await ig.challenge.selectVerifyMethod(1, false); // Requesting sms-code or click "It was me" button
            console.log(ig.state.checkpoint); // Challenge info here
            console.log(chalk.green('[+++] Check OTP Email'))
            const {
                code
            } = await inquirer.prompt([{
                type: 'input',
                name: 'code',
                message: 'Enter code',
            }, ]);

            const end = await ig.challenge.sendSecurityCode(code)
           // await ig.request.end$.subscribe(() => saveState(ig, profile));
            resolve(end);
        }).catch(e => console.log(chalk.red('Could not resolve checkpoint:', e, e.stack)));
    });
}

async function loginToInstagram(ig) {
    ig.request.end$.subscribe(() => saveState(ig));
    await ig.account.login(IG_USERNAME, IG_PASSWORD);
}

/**
 * A wrapper function to log to the console
 * @param name
 * @returns {(data) => void}
 */
function logEvent(name) {
    return (data) => console.log(name, data);
}