import { NewPatientEntry, Gender, NewEntry } from './types';

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

const parseString = (description: string, text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing name ${description}`);
  }

  return text;
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
    name: parseString('name', name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    entries: [],
  };

  return newEntry;
};

type EntryFields =
  | UtilsHospitalEntry
  | UtilsHealthcareEntry
  | UtilsOccupationalHealthcare;

interface BaseEntry {
  date: unknown;
  specialist: unknown;
  description: unknown;
}

interface UtilsHospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: unknown;
    criteria: unknown;
  };
}

interface UtilsHealthcareEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: unknown;
}

interface UtilsOccupationalHealthcare extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: unknown;
}

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (!healthCheckRating || typeof healthCheckRating !== 'number') {
    throw new Error('healthCheckRating is missing or incorrect');
  }
  return healthCheckRating;
};

const toNewEntry = (entry: EntryFields): NewEntry => {
  let newEntry: NewEntry;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member : ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return {
        date: parseDateOfBirth(entry.date),
        type: 'Hospital',
        specialist: parseString('specialist', entry.specialist),
        description: parseString('description', entry.description),
        discharge: {
          date: parseDateOfBirth(entry.discharge?.date),
          criteria: parseString('criteria', entry.discharge?.criteria),
        },
      };
      return newEntry;
      break;
    case 'OccupationalHealthcare':
      newEntry = {
        date: parseDateOfBirth(entry.date),
        type: 'OccupationalHealthcare',
        specialist: parseString('specialist', entry.specialist),
        description: parseString('description', entry.description),
        employerName: parseString('employer name', entry.employerName),
      };
      return newEntry;
      break;
    case 'HealthCheck':
      newEntry = {
        date: parseDateOfBirth(entry.date),
        type: 'HealthCheck',
        specialist: parseString('specialist', entry.specialist),
        description: parseString('description', entry.description),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
      return newEntry;
      break;
    default:
      return assertNever(entry);
  }
};

export default {
  toNewPatientEntry,
  toNewEntry,
};
