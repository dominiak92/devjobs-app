import { ThemeProvider, createTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import styles from "../../scss/Button.module.scss";

const theme1 = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          fontFamily: "Kumbh Sans",
          fontWeight: "700",
          color: "white",
          backgroundColor: "#6673ff",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#9DAEC2",
          },
        },
      },
    },
  },
});
const theme2 = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontFamily: "Kumbh Sans",
          fontWeight: "700",
          color: "white",
          backgroundColor: "#5964E0",
          borderRadius: "5px",
          width: "100%",
          height: "48px",
          "&:hover": {
            backgroundColor: "#9DAEC2",
          },
        },
      },
    },
  },
});

const Button = (props) => {
  return (
    <ThemeProvider theme={props.name === "Apply now" ? theme2 : theme1}>
      <Fab className={styles.button} variant="extended">
        <p className={styles.button}>{props.name}</p>
      </Fab>
    </ThemeProvider>
  );
};

export default Button;
