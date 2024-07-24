import { Sequelize } from "sequelize";


class Database extends Sequelize {
    
    constructor() {
        super(process.env.DB_URL, {
            dialect: 'postgres',
            logging: false
        });
        this.connect();
    }

    async connect() {
        try {
            await this.authenticate()
            console.log('Database connection successfully established');
        }
        catch(error) {
            console.error('Unable to connect to database');
            console.error(error)
        }
    };
};

const database = new Database();

export { database };
