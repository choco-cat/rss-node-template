import {getConnection, createConnection} from "typeorm";

const config = require('../common/ormconfig.ts');
//const dbShema = require('../migration/dbShema.ts');

const connectToDB = async () => {
    let connection;
    try {
        connection = getConnection();
        if (!connection.isConnected) {
            await connection.connect();
        } else {
            await createConnection(config);
        }
        console.log('Susseful connect!')
    } catch (err) {
        await createConnection(config);

      /*  connection = getConnection();
        const queryRunner: QueryRunner = connection.createQueryRunner();
        console.log('dbShema',dbShema);
        // eslint-disable-next-line new-cap
        dbShema.up(queryRunner); */


       // await dbShema.up();
       // connection = getConnection();
       // console.log('connection name', connection.name);
       // console.error('Connection Error', err);
    }
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
