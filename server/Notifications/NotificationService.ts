import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
config();

class Hermes extends Client {

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });

        this.login(process.env.HERMES);
    }

    checkStatus() {
        this.on('ready', () => {
            console.log('Hermes is ready');
        });
    };

    async sendErrorMessage(error: string) {
        this.checkStatus();

        let message = 'A problem has been encountered trying to connect to the database.\n';
        message += `The error can be found below.\n${error}`;

        const ngin = await this.users.fetch(process.env.NGIN);
        ngin.send(message);
    };
};

const hermes = new Hermes();

export { hermes };
