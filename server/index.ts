import express, { Application } from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from 'config';
import multer from 'multer';

import visitorRouter from './routers/visitorRouter';
import errorMiddleware from './middlewares/errorMiddleware';
import userRouter from './routers/userRouter';
import authMiddleware from './middlewares/authMiddleware';
import { ADMIN } from './roles/roles';
import roleMiddleware from './middlewares/roleMiddleware';
import adminRouter from './routers/adminRouter';
import path from 'path';
import sequelizeRepository from './repositories/sequelizeRepository';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: config.get('CLIENT_URL'),
  }),
);
app.use('/api/visitor', multer().none(), visitorRouter);
app.use('/api/user', authMiddleware, userRouter);
app.use('/api/admin', authMiddleware, roleMiddleware([ADMIN]), adminRouter);
app.use(errorMiddleware);

//запуск на хостинге
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const start = async () => {
  try {
    await sequelizeRepository.connect();

    app.listen(config.get('PORT'), () => {
      console.log(`App listening on port ${config.get('PORT')}...`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
