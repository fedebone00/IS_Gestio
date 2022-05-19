import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded());


export default app;