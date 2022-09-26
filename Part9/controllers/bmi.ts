const bmiRouter = require('express').Router();
import { calculateBmi } from '../bmiCalculator';

bmiRouter.get('/', (req: any, res: any) => {
  const height: number = parseInt(req.query.height);
  const weight: number = parseInt(req.query.weight);

  const bmi = calculateBmi(height, weight);

  if (!height || !weight) {
    res.send({
      error: 'malformatted parameters',
    });
  } else {
    res.send({
      weight,
      height,
      bmi,
    });
  }
});

module.exports = bmiRouter;
