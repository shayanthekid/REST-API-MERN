import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: true,
    maxPoolSize: 50,
    wtimeoutMS: 2500
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'sajid';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'test123';
const MONGO_HOST = process.env.MONGO_HOST || 'rest.5fgd9.mongodb.net/rest?retryWrites=true&w=majority';

const MONGO = {
    host: MONGO_HOST,
    options: MONGO_OPTIONS,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};
//   "mongodb+srv://sajid:test123@rest.5fgd9.mongodb.net/rest?retryWrites=true&w=majority",

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'ORGNAME';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'SUPERSECRET';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    server: SERVER,
    mongo: MONGO
};

export default config;
