import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import helmet from "helmet";
import * as dotenv from 'dotenv'

import {AppModule} from "./app.module";
import {UserModule} from "./users/user.module";
import {WalletModule} from "./wallets/wallet.module";


dotenv.config({
    path: '.env'
});

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.APP_ENV === "testing" ? process.env.PORT_TEST : process.env.PORT;
const routes: Array<AppModule> = [];

app.use(helmet());
app.use(express.json());
app.use(cors());

if(process.env.APP_ENV !== "testing"){
    //WINSTON LOGGING CONFIG
    console.log("I am on test mode");
    const loggerOptions: expressWinston.LoggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize({all: true})
        ),
    };
    app.use(expressWinston.logger(loggerOptions));
}


//ADD EVERY MODULE TO THE ROUTE
routes.push(new UserModule(app));
routes.push(new WalletModule(app));

const runningMessage = `Server running at http://localhost:${port}`;

app.get('/health', (req: express.Request, res: express.Response) => {
    res.status(200).send('Online')
});

server.listen(port, () => {
    //INITIALIZE ALL ROUTES
    routes.forEach((route: AppModule) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
    console.log(runningMessage);
});

export default server;
