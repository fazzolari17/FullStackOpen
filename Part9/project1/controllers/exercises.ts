import * as express from 'express';
import { exerciseCalculator } from '../exerciseCalculator';
const exercisesRouter = express.Router();

exercisesRouter.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const daily_exercises: number[] =
    req.body.daily_exercises; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target: number = req.body.target; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

  if (!target || !daily_exercises) {
    res.status(401).send({
      error: 'parameters missing',
    });
  } else if (typeof daily_exercises === 'string') {
    res.status(401).send({
      error: 'malformatted parameters',
    });
  }
  const response: object = exerciseCalculator(
    Number(target),
    daily_exercises
  );
  res.send(response);
});

export { exercisesRouter };
