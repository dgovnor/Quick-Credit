import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import homeRoute from './routes/homeRoute';
import adminRoute from './routes/adminRoute';
import userRoute from './routes/userRoute';
import docs from './docs/swagger.json';

// set up express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(docs));
app.use('/', homeRoute);
app.use('/api/v1', homeRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/admin', adminRoute);

// Wrong endpoints
app.use((_req, res) => res.status(404).send({
  status: 404,
  error: 'URL doesn\'t exist, Please check again ',
}));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running ${PORT}`);
});

export default app;
