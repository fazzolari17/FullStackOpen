import { NewPatientEntry, Gender } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Missing Gender`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Missing occupation`);
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`SSN is missing or is incorrect`);
  }
  return ssn;
};

const isDateOfBirth = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDateOfBirth(dateOfBirth)) {
    throw new Error(`Incorrect or missing date of birth: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  occupation: unknown;
  gender: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  occupation,
  gender,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
  };

  return newEntry;
};

export default {
  toNewPatientEntry,
};
