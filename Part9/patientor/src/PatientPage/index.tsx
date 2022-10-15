import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Entry, Patient } from "../types";
import { updatePatient } from "../state/reducer";

import { IconContext } from "react-icons";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

const PatientPage = () => {
  const paramId = useParams().id;

  const [{ patients }, dispatch] = useStateValue();

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
    <IconContext.Provider value={{ color: "red", size: "1.2rem" }}>
      {genderIconDecider}
    </IconContext.Provider>
  );
  if (found.entries === undefined) {
    throw new Error("No Entries Found");
  }
  const entries: Entry = found.entries[0];
  let codes; //: JSX.Element[] | [] = [];

  if (entries === undefined) {
    codes = [];
  } else if (entries.diagnosisCodes !== undefined) {
    codes = entries.diagnosisCodes?.map((item) => <li key={item}>{item}</li>);
  }

  return (
    <>
      <h3>
        {found.name} {genderIcon}
      </h3>
      <p>SSN: {found.ssn}</p>
      <p>OCCUPATION: {found.occupation}</p>
      <p>Entries</p>
      {entries !== undefined ? <p>{entries.description}</p> : <></>}
      <ul>{codes}</ul>
    </>
  );
};

export default PatientPage;
