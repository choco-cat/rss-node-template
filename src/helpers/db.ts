import { getConnection, createConnection } from "typeorm";

const config = require('../common/ormconfig.ts');

const connectToDB = async () => {
    let connection;
    try {
        createConnection(config);
        connection = getConnection();
        if (!connection.isConnected) {
            await connection.connect();
        } else {
            createConnection(config);
        }
    } catch (err) {
        console.error('Connection Error');
    }
    console.log('Susseful connect!')
}

const TryDBConnect = async (cb: () => void) => {
    try {
        connectToDB();
        cb();
    } catch (err) {
        console.error('DB Connection Error');
    }
}
module.exports = TryDBConnect;
