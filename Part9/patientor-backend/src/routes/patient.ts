import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const patientRouter = express.Router();

patientRouter.get('/:id', (req, res) => {
  res.send(patientService.findPatient(req.params.id));
});

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

patientRouter.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
