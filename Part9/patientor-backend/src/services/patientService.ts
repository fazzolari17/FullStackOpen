import data from '../../data/patients.json';
import {
  PatientEntry,
  NonSensitivePatientEntries,
  NewPatientEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

const patientData: Array<PatientEntry> = data;

const addNewPatient = (entry: NewPatientEntry): PatientEntry => {
  console.log(entry);
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  data.push(newPatientEntry);
  return newPatientEntry;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntries[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientEntries = (): Array<PatientEntry> => {
  return patientData;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addNewPatient,
};
