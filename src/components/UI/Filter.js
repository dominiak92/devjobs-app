import styles from "../../scss/Filter.module.scss";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredJobs } from "../../store/jobsSlice";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useMediaQuery } from "react-responsive";

const Filter = () => {
  const [location, setLocation] = useState("");
  const [defaultLocation, setDefaultLocation] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.jobs.data);
  const currentStyle = useSelector((state) => state.theme.currentStyle);
  const isDesktop = useMediaQuery({ maxWidth: 1200 });

  const locationData = [
    "Singapore",
    "Japan",
    "Russia",
    "Germany",
    "United States",
    "New Zealand",
    "United Kingdom",
  ];

  const filterHandler = () => {
    const filteredJobs = data.filter((element) => {
      const isCompanyMatch = element.company
        .toLowerCase()
        .includes(filterValue.toLowerCase().trim());
      const isPositionMatch = element.position
        .toLowerCase()
        .includes(filterValue.toLowerCase().trim());
      if (checked || filterValue || location) {
        if (checked) {
          return (
            (isCompanyMatch || isPositionMatch) &&
            element.location.includes(location) &&
            element.contract.includes("Full Time")
          );
        } else {
          return (
            (isCompanyMatch || isPositionMatch) &&
            element.location.includes(location)
          );
        }
      } else {
        return isCompanyMatch || isPositionMatch;
      }
    });

    dispatch(setFilteredJobs(filteredJobs));
    setFilteredData(filteredJobs);
    setFilterValue("");
  };

  const locationTimeFilterHandler = () => {
    if (checked || location) {
      const filteredJobs = data.filter((element) => {
        if (checked) {
          return (
            element.location.includes(location) &&
            element.contract.includes("Full Time")
          );
        } else {
          return element.location.includes(location);
        }
      });
      dispatch(setFilteredJobs(filteredJobs));
    } else {
      dispatch(setFilteredJobs(data));
    }
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

  const CheckboxHandler = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setLocation(defaultLocation);
  }, [defaultLocation]);

const inputWidth = isDesktop ? 190 : 260;

  return (
    <div className={classNames(styles.filter, styles[currentStyle])}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <SearchIcon
          sx={{
            color: currentStyle === "dark" ? "white" : "action.active",
            mr: 1,
            my: 0.5,
            verticalAlign: "middle",
          }}
        />
        <TextField
          id="demo-helper-text-misaligned-no-helper"
          label={ isDesktop ? 'Position or company..' : 'Filter by position or company..' }
          InputLabelProps={{
            style: {
              fontFamily: "Kumbh Sans",
              color: currentStyle === "dark" ? "white" : "#19202D",
            },
          }}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              filterHandler();
              ev.preventDefault();
            }
          }}
          sx={{
            width: { sm: inputWidth }, 
            "& fieldset": { border: "none" },
          }}
          value={filterValue}
          onChange={dataSetter}
          InputProps={{
            style: {
              fontFamily: "Kumbh Sans",
              color: currentStyle === "dark" ? "white" : "#19202D",
            },
          }}
        />
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <LocationOnIcon
          sx={{
            mr: 0.5,
            my: 0.5,
            color: currentStyle === "dark" ? "white" : "action.active",
          }}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: currentStyle === "dark" ? "white" : "black" }}
              id="demo-simple-select-label"
            >
              Location
            </InputLabel>
            <Select
              sx={{
                fontSize: "16px",
                maxWidth: '180px',
                width: '180px',
                fontFamily: "'Kumbh Sans', sans-serif;",
                color: currentStyle === "dark" ? "white" : "black",
                "& fieldset": { border: "none" },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {locationData.map((element, index) => (
                <MenuItem key={index} value={element}>
                  {element}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <FormControlLabel
        control={
          <Checkbox
            style={{
              color: currentStyle === "dark" ? "white" : "black",
            }}
            checked={checked}
            onChange={CheckboxHandler}
          />
        }
        sx={{
          fontFamily: "Kumbh Sans",
          color: currentStyle === "dark" ? "white" : "black",
        }}
        label={
          <Typography className={styles.formControlLabel}>{isDesktop ? 'Full Time' : 'Full Time Only'}</Typography>
        }
      />
      <Button
        style={{
          borderRadius: 5,
          backgroundColor: "#5964E0",
          padding: "12px",
          width: "80px",
          minWidth: "48px",
          fontFamily: "Kumbh Sans, sans-serif",
        }}
        variant="contained"
        type="submit"
        onClick={filterValue ? filterHandler : locationTimeFilterHandler}
      >
        Search
      </Button>
    </div>
  );
};

export default Filter;
