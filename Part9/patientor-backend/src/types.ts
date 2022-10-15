interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

type Entry = MainEntry | EmployerNameEntry | HealthCheckRating;

export interface MainEntry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  description: string;
  diagnosisCodes?: string[];
  sickLeave?: SickLeave;
  discharge?: Discharge;
}

export interface EmployerNameEntry extends MainEntry {
  employerName: string;
}

export interface HealthCheckRating extends MainEntry {
  healthCheckRating: number;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries?: Entry[];
}

export type Patient = Omit<PatientEntry, 'entries'>;

export type NonSensitivePatientEntries = Omit<PatientEntry, 'ssn'>;
