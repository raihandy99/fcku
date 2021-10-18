curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
apt-get install npm
mkdir node_modules

npm install -g big-integer;ln -s /usr/local/lib/node_modules/big-integer node_modules/big-integer
npm install -g express;ln -s /usr/local/lib/node_modules/express node_modules/express
npm install -g readline-sync;ln -s /usr/local/lib/node_modules/readline-sync node_modules/readline-sync
npm install -g delay;ln -s /usr/local/lib/node_modules/delay node_modules/delay
npm install -g socket.io;ln -s /usr/local/lib/node_modules/socket.io node_modules/socket.io
npm install -g instagram_mqtt;ln -s /usr/local/lib/node_modules/instagram_mqtt node_modules/instagram_mqtt
npm install -g instagram-private-api;ln -s /usr/local/lib/node_modules/instagram-private-api node_modules/instagram-private-api
npm install -g chalk;ln -s /usr/local/lib/node_modules/chalk node_modules/chalk
npm install -g bluebird;ln -s /usr/local/lib/node_modules/bluebird node_modules/bluebird
npm install -g inquirer;ln -s /usr/local/lib/node_modules/inquirer node_modules/inquirer
npm install -g node-telegram-bot-api;ln -s /usr/local/lib/node_modules/node-telegram-bot-api node_modules/node-telegram-bot-api