import * as express from 'express';
import { calculateBmi } from '../bmiCalculator';

const bmiRouter = express.Router();

bmiRouter.get('/', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmi = calculateBmi(height, weight);

  if (!height || !weight) {
    res.send({
      error: 'malformatted parameters',
    });
  } else {
    res.status(401).send({
      weight,
      height,
      bmi,
    });
  }
});

export { bmiRouter };
