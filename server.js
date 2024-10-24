const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');

mongoose.connect(config.get('db.connection'))
.then(() => console.log('Connected to TradeMatePro mongodb database'))
.catch((error) => console.error('Error connecting to TradeMatePro database....', error));

const server = express();


server.set('view engine', 'ejs');
server.set('views', './views');

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));

if (server.get('env') === 'development') {
    server.use(morgan('dev'));
}



const port = config.get('server.port');

server.listen(port, () => console.log(`TradeMatePro server listening at port ${port}`));