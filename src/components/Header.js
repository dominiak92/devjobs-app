import styles from "../scss/Header.module.scss";
import ToggleButton from "./UI/ToggleButton";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const handleLogoClick = (event) => {
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoToggle}>
        <NavLink to="/" onClick={handleLogoClick}>
          <p className={styles.logo}>devjobs</p>
        </NavLink>
        <div className={styles.toggle}>
          <ToggleButton />
        </div>
      </div>
    </div>
  );
};

export default Header;