import React from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Entry, Patient } from "../types";
import { updatePatient } from "../state/reducer";

import { IconContext } from "react-icons";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import EntryDetails from "../components/EntryDetails";
import { Stack } from "@mui/material";
const PatientPage = () => {
  const paramId = useParams().id;
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const fetchPatientData = async (patientId: string) => {
    try {
      const response = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${patientId}`
      );
      found = response.data;
      dispatch(updatePatient(response.data));
    } catch (error) {
      console.error("STATUS", error.message);
    }
  };

  let found = Object.values(patients).find(
    (patient: Patient) => patient.id === paramId
  );

  if (!found) {
    throw new Error("USER NOT FOUND::");
  } else if (found) {
    if (found.ssn === undefined) {
      const patientId: string = found.id;
      void fetchPatientData(patientId);
    }
  }

  const genderIconDecider =
    found.gender === "male" ? <BsGenderMale /> : <BsGenderFemale />;

  const genderIcon = (
    <IconContext.Provider value={{ color: "red" }}>
      {genderIconDecider}
    </IconContext.Provider>
  );

  if (found.entries === undefined) {
    throw new Error("No Entries Found");
  }

  const entries: Entry = found.entries[0];
  let codes: JSX.Element[] | [] = [];
  let entry: JSX.Element[] | [] = [];

  if (entries === undefined) {
    codes = [];
  } else if (entries.diagnosisCodes !== undefined) {
    codes = entries.diagnosisCodes?.map((item: string) => {
      const O = Object.values(diagnoses);
      const description = O.find((diagnoses) => diagnoses.code === item);
      return description === undefined ? (
        <li key={item}>{`${item} - Diagnoses Name Not Found`}</li>
      ) : (
        <li key={item}>{`${item} - ${description.name}`}</li>
      );
    });
  }

  entry = found.entries.map((entry: Entry) => (
    <EntryDetails key={nanoid()} entry={entry}></EntryDetails>
  ));

  return (
    <>
      <h3>
        {found.name} {genderIcon}
      </h3>
      <p>SSN: {found.ssn}</p>
      <p>OCCUPATION: {found.occupation}</p>
      <p>Entries</p>
      <ul>{codes}</ul>
      <Stack spacing={3}>{entry}</Stack>
    </>
  );
};

export default PatientPage;
