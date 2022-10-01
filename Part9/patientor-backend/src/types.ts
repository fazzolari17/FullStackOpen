// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

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

// May not be needed
export type Patient = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NonSensitivePatientEntries = Omit<PatientEntry, 'ssn'>;
