import express = require('express');
const app = express();

const bmiRouter = require('./controllers/bmi');

app.get('/hello', (_req: any, res: any) => {
  res.send('Hello');
});

app.use('/bmi', bmiRouter);

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
