import express = require('express');
const app = express();
import { bmiRouter } from './controllers/bmi';
import { exercisesRouter } from './controllers/exercises';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello');
});

app.use('/bmi', bmiRouter);
app.use('/exercise', exercisesRouter);

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
