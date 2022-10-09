import data from '../../data/patients.json';
import {
  Patient,
  PatientEntry,
  NonSensitivePatientEntries,
  NewPatientEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

const patientData: Array<PatientEntry> = data;

const findPatient = (id: string): PatientEntry | unknown => {
  const patientFound = data.find((patient) => patient.id === id);
  return { ...patientFound, entries: [] };
};

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
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatientEntries = (): Patient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
      ssn,
    })
  );
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addNewPatient,
  findPatient,
};
