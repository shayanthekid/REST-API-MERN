import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import userRoutes from './routes/user';
import memberRoutes from './routes/member';
import mongoose from 'mongoose';
var cors = require('cors');
const NAMESPACE = 'Server';
const router = express();

/*Connect to mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Connected to DB');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/*Logging the request */

router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}], URL - [${req.url}], IP -
         [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });
    next();
});

//Parse request
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* Rules of api */
router.use(cors());
router.options('*', cors());
const allowlist = ['http://localhost:3000/', 'http://localhost:3001'];
const corsOptionsDelegate = function (req:any, callback:any) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) corsOptions = { origin: true, credentials: true };
    else corsOptions = { origin: false }; // disable CORS for this request
    callback(null, corsOptions); // callback expects two parameters: error and options
};

router.use(cors(corsOptionsDelegate));

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PUT DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/*Routes */
router.use('/users', userRoutes);
router.use('/members',memberRoutes)

/*Error Handling */

router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/**Create Server */

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server Running on ${config.server.hostname}:${config.server.port}`);
});
