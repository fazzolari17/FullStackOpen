import data from '../../data/patients';
import {
  Patient,
  PatientEntry,
  NonSensitivePatientEntries,
  NewPatientEntry,
  NewEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

const patientData: Array<PatientEntry> = data;

const findPatient = (id: string): PatientEntry | unknown => {
  const patientFound = data.find((patient) => patient.id === id);
  return { ...patientFound };
};

const addNewPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
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

const addNewEntry = (id: string, entry: NewEntry): PatientEntry => {
  const person = patientData.find((person) => person.id === id);
  if (person === undefined) {
    throw new Error('Person Not Found');
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member : ${JSON.stringify(value)}`
    );
  };

  let updatedPerson: PatientEntry;

  switch (entry.type) {
    case 'Hospital':
      updatedPerson = {
        ...person,
        entries: [
          ...person.entries,
          {
            id: uuid(),
            date: entry.date,
            specialist: entry.specialist,
            type: entry.type,
            description: entry.description,
            discharge: entry.discharge,
          },
        ],
      };
      return updatedPerson;
      break;
    case 'HealthCheck':
      updatedPerson = {
        ...person,
        entries: [
          ...person.entries,
          {
            id: uuid(),
            date: entry.date,
            specialist: entry.specialist,
            type: entry.type,
            description: entry.description,
            healthCheckRating: entry.healthCheckRating,
          },
        ],
      };
      return updatedPerson;
      break;
    case 'OccupationalHealthcare':
      updatedPerson = {
        ...person,
        entries: [
          ...person.entries,
          {
            id: uuid(),
            date: entry.date,
            specialist: entry.specialist,
            type: 'OccupationalHealthcare',
            description: entry.description,
            employerName: entry.employerName,
          },
        ],
      };
      return updatedPerson;
      break;
    default:
      return assertNever(entry);
  }
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addNewPatient,
  findPatient,
  addNewEntry,
};
