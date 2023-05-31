import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import styles from "../../scss/DialogError.module.scss";
import { useLocation, NavLink } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const DialogError = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const handleReturnClick = (event) => {
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleReturnClick}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogContent>
        <div className={styles.error}>
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: "70px", padding: '20px' }} />
          <DialogContentText className={styles.message}>
          No search results found, press button to return
          </DialogContentText>
        </div>
      </DialogContent>
      <DialogActions>
        <NavLink to="/" onClick={handleReturnClick}>
          <button className={styles.button}>Return</button>
        </NavLink>
      </DialogActions>
    </Dialog>
  );
};

export default DialogError;
