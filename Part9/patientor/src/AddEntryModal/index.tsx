import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { EntryFormValues } from "../types";
import HospitalEntryForm from "./HospitalEntryForm";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => Promise<void>;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [currentForm, setCurrentForm] = useState({ count: 0 });

  const decreaseCount = () => {
    setCurrentForm((prevState) => {
      switch (prevState.count) {
        case 1:
        case 2:
          return { count: prevState.count - 1 };
          break;
        case 0:
          return { count: 2 };
          break;
        default:
          return prevState;
      }
    });
  };

  const increaseCount = () => {
    setCurrentForm((prevState) => {
      switch (prevState.count) {
        case 0:
        case 1:
          return { count: prevState.count + 1 };
          break;
        case 2:
          return { count: 0 };
          break;
        default:
          return prevState;
      }
    });
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            // style={{  float: "left" }}
            type="button"
            onClick={decreaseCount}
            // onClick={onCancel}
          >
            {" "}
            {"<"}
          </Button>
        </Grid>
        <Grid item>
          <DialogTitle>Add New Patient Entry</DialogTitle>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            // style={{  float: "right" }}
            type="button"
            onClick={increaseCount}
            // onClick={onCancel}
          >
            {" "}
            {">"}
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        {currentForm.count === 0 ? (
          <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        ) : currentForm.count === 1 ? (
          <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
        ) : (
          <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
