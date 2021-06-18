import { ConnectionOptions } from "typeorm";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
      path: path.join(__dirname, '../../.env')
    });
const { DB_PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
const config = {
      "type": "postgres",
      "host": DB_HOST,
      "port": DB_PORT,
      "username": DB_USER,
      "password": DB_PASS,
      "database": DB_NAME,
      "synchronize": true,
      "autoreconnect": true,
      "logging": false,
      "entities": ["src/entities/*.ts"]
} as ConnectionOptions;

module.exports = config;
export {};