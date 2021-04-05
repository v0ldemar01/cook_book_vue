import express from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { env } from './env';
import routes from './api/routes';
import { errorHandlerMiddleware } from './api/middlewares/errorHandlerMiddleware';

const app = express();

createConnection()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use(errorHandlerMiddleware);
app.listen(env.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${env.app.port}.`);
});

export default app;
