import React from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { NewEntry, Entry, Patient, Diagnosis } from "../types";
import { updatePatient, addEntry, setPatientDiagnoses } from "../state/reducer";

import { IconContext } from "react-icons";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import EntryDetails from "../components/EntryDetails";
import { Stack, Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { parseString } from "../utils";

const PatientPage = () => {
  const paramId = useParams().id;
  const [{ patients, diagnoses, patientDiagnosesCodes }, dispatch] =
    useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    if (entries === undefined) {
      codes = [];
    } else if (entries.diagnosisCodes !== undefined) {
      if (found) {
        setDiagnosesCodesArray(found);
      }

      codes = patientDiagnosesCodes.map((item: string) => {
        const O = Object.values(diagnoses);
        const description = O.find((diagnoses) => diagnoses.code === item);
        return description === undefined ? (
          <li key={item}>{`${item} - Diagnoses Name Not Found`}</li>
        ) : (
          <li key={item}>{`${item} - ${description.name}`}</li>
        );
      });
    }
  }, [patients]);

  const setDiagnosesCodesArray = (patient: Patient): void => {
    const { entries } = patient;
    const codes: Array<Diagnosis["code"]> = [];
    entries.forEach((entry) => {
      if (entry.diagnosisCodes) {
        for (let i = 0; i < entry.diagnosisCodes.length; i++) {
          const item = parseString(entry.diagnosisCodes[i]);
          codes.push(item);
        }
      }
    });

    dispatch(setPatientDiagnoses(codes));
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const {
      date,
      description,
      specialist,
      discharge: { dischargeDate, criteria },
      diagnosisCodes: code,
    } = values;

    if (!paramId) {
      throw new Error("User is not in Database");
    }

    const newEntry: NewEntry = {
      type: "Hospital",
      date,
      description,
      specialist,
      discharge: {
        date: dischargeDate,
        criteria,
      },
      diagnosesCodes: code,
    };

    try {
      const { data }: { data: Entry } = await axios.post(
        `${apiBaseUrl}/patients/${paramId}/entries`,
        newEntry
      );
      dispatch(addEntry(paramId, data));
      closeModal();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error?.response?.data || "Unrecognized axios error");
        setError(
          String(error?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.log("Unknown error", error);
        setError("Unknown error");
      }
    }
  };

  const fetchPatientData = async (patientId: string) => {
    try {
      const response = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${patientId}`
      );
      found = response.data;
      dispatch(updatePatient(response.data));
      setDiagnosesCodesArray(found);
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

  // Icon Selectors
  const genderIconDecider =
    found.gender === "male" ? <BsGenderMale /> : <BsGenderFemale />;

  const genderIcon = (
    <IconContext.Provider value={{ color: "red" }}>
      {genderIconDecider}
    </IconContext.Provider>
  );

  // Business Logic
  // if (found.entries === undefined) {
  //   throw new Error("No Entries Found");
  // }

  const entries: Entry = found.entries[0];
  let codes: JSX.Element[] | [] = [];
  let entry: JSX.Element[] | [] = [];

  if (entries === undefined) {
    codes = [];
  } else if (entries.diagnosisCodes !== undefined) {
    codes = patientDiagnosesCodes.map((item: string) => {
      const O = Object.values(diagnoses);
      const description = O.find((diagnoses) => diagnoses.code === item);
      return description === undefined ? (
        <li key={nanoid()}>{`${item} - Diagnoses Name Not Found`}</li>
      ) : (
        <li key={nanoid()}>{`${item} - ${description.name}`}</li>
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
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <p>Entries</p>
      <ul>{codes}</ul>
      <Stack spacing={3}>{entry}</Stack>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
    </>
  );
};

export default PatientPage;
