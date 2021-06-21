import { Request, Response, NextFunction } from 'express';

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router.ts');
const boardRouter = require('./resources/boards/board.router.ts');
const loginRouter = require('./resources/login/login.router.ts');
const taskRouter = require('./resources/tasks/task.router.ts');
const { errorHandler, uncaughtExceptionHandler, unhandledRejectionHandler } = require('./middleware/errorHandler.ts');
const logger = require('./middleware/logger.ts');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());
app.use(logger);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('/boards', boardRouter);
app.use('/login', loginRouter);
app.use('/exit', () => process.exit(2));
app.use(errorHandler);
process.on('uncaughtException', uncaughtExceptionHandler);
// throw Error('Oops!');
process.on('unhandledRejection', unhandledRejectionHandler);
// Promise.reject(Error('Oops!'))
// });

module.exports = app;
