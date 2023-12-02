import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasks.routes.js';
import indexRoutes from './routes/index.routes.js';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(express.json());
app.use(tasksRoutes);
app.use(indexRoutes);
app.use(morgan('dev'));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(status).json({
      status: "error",
      message: message,
    });
  });

  export default app;