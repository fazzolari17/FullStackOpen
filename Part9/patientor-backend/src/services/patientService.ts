import data from '../../data/patients.json';

import { PatientEntry, NonSensitivePatientEntries } from '../types';

const patientData: Array<PatientEntry> = data;

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
};
