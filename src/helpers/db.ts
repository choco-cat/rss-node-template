import {getConnection, createConnection} from "typeorm";

const config = require('../../ormconfig.ts');

const connectToDB = async () => {
  let connection;
  try {
    connection = getConnection();
    if (!connection.isConnected) {
      await connection.connect();
    } else {
      await createConnection(config);
    }
    console.log('Successful connect!')
  } catch (err) {
    await createConnection(config);
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
