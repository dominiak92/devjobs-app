import styles from "../../scss/MobileFilter.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { getJobs } from "../../store/jobsSlice";
import { setFilteredJobs } from "../../store/jobsSlice";
import Typography from "@mui/material/Typography";

const MobileFilter = () => {
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [defaultLocation, setDefaultLocation] = useState("Singapore");
  const [location, setLocation] = useState("");
  const [checked, setChecked] = useState(false);
  const locationData = [
    "Singapore",
    "Japan",
    "Russia",
    "Germany",
    "United States",
    "New Zealand",
    "United Kingdom",
  ];
  const dispatch = useDispatch();
  const data = useSelector((state) => state.jobs.data);
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  useEffect(() => {
    if (open) {
      setLocation(defaultLocation);
    }
  }, [open, defaultLocation]);

  const handleFilter = (e) => {
    e.preventDefault()
    const filteredJobs = data.filter(
      (element) =>
        element.company
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim()) ||
        element.position
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim())
    );

    dispatch(setFilteredJobs(filteredJobs));
    setFilteredData(filteredJobs);
    setFilterValue("");
  };
  const CheckboxHandler = (event) => {
    setChecked(event.target.checked);
  };

  const dataSetter = (event) => {
    setFilterValue(event.target.value);
    const filteredJobs = data.filter(
      (element) =>
        element.company
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim()) ||
        element.position
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim())
    );
    setInputData(filteredJobs);
  };
  const handleDialogFilter = () => {
    const dialogData = filteredData.length === 0 ? data : filteredData;
    const mainData = inputData.length === 0 ? dialogData : inputData;
    const dialogFilteredJobs = mainData.filter((element) => {
      if (checked) {
        return (
          element.location.includes(location) &&
          element.contract.includes("Full Time")
        );
      } else {
        return element.location.includes(location);
      }
    });

    dispatch(setFilteredJobs(dialogFilteredJobs));
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentStyle = useSelector((state) => state.theme.currentStyle);
  return (
    <div className={classNames(styles.mobileFilter, styles[currentStyle])}>
      <Box
        component="form"
        sx={{
          fontFamily: "Kumbh Sans",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          onChange={dataSetter}
          sx={{
            fontFamily: "Kumbh Sans",
            color: currentStyle === "dark" ? "white" : "black",
          }}
          placeholder="Position or company.."
          value={filterValue}
          required
        />
        <IconButton
          onClick={handleClickOpen}
          color="primary"
          aria-label="filter"
        >
          <FilterAltIcon sx={{ color: "#5964E0" }} />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <Box
            sx={{
              minWidth: 240,
              minHeight: 240,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 160,
                height: 70,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "20px",
                    fontFamily: "'Kumbh Sans', sans-serif;",
                  }}
                  variant="standard"
                  htmlFor="uncontrolled-native"
                >
                  Filter by location
                  <LocationOnIcon sx={{ mr: 0.5, my: 0.5 }} />
                </InputLabel>
                <NativeSelect
                  sx={{
                    fontSize: "16px",
                    fontFamily: "'Kumbh Sans', sans-serif;",
                    paddingTop: "6px",
                  }}
                  defaultValue={"Singapore"}
                  inputProps={{
                    name: "Filter by location",
                  }}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locationData.map((element, index) => (
                    <option key={index} value={`${element}`}>
                      {element}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "0px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={CheckboxHandler} />
                }
                label={
                  <Typography className={styles.formControlLabel}>
                    Full Time Only
                  </Typography>
                }
              />
              <DialogActions>
                <Button
                  style={{
                    fontFamily: "Kumbh Sans",
                    color: "white",
                    borderRadius: 5,
                    backgroundColor: "#5964E0",
                    padding: "12px",
                    width: "168px",
                    minWidth: "48px",
                  }}
                  onClick={handleDialogFilter}
                >
                  Search
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Dialog>
        <Button
          style={{
            borderRadius: 5,
            backgroundColor: "#5964E0",
            padding: "12px",
            width: "48px",
            minWidth: "48px",
          }}
          variant="contained"
          type="submit"
          onClick={handleFilter}
        >
          <SearchIcon />
        </Button>
      </Box>
    </div>
  );
};

export default MobileFilter;
