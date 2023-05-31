import { useDispatch, useSelector } from "react-redux";
import styles from "../scss/JobsList.module.scss";
import { useEffect, useState } from "react";
import { getJobs } from "../store/jobsSlice";
import { Link } from "react-router-dom";
import MobileFilter from "./UI/MobileFilter";
import classNames from "classnames";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Filter from "./UI/Filter";
import Dialog from '@mui/material/Dialog';
import DialogError from "./UI/DialogError";

const JobsList = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.jobs.filter);
  const loading = useSelector((state) => state.jobs.loading);
  const currentStyle = useSelector((state) => state.theme.currentStyle);
  const jobsPerRow = 8;

  const [next, setNext] = useState(jobsPerRow);
  const handleMoreJob = () => {
    setNext(next + jobsPerRow);
  };

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);
  const location = useLocation();

  const handleReturnClick = (event) => {
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  const isTablet = useMediaQuery({ maxWidth: 768 });

  return (
    <div className={styles.wrapper}>        
    {isTablet ? <MobileFilter /> : <Filter/>}
      <div className={styles.jobs}>

        {filter?.slice(0, next)?.map((element, index) => (
          <Link
            to={{ pathname: `/job/${element.id}`, state: { job: element } }}
            index={index}
            className={classNames(styles.card, styles[currentStyle])}
            key={element.id}
          >
            <div
              style={{ backgroundColor: element.logoBackground }}
              className={styles.logo}
            >
              <img src={`${require(`../assets${element.logo}`)}`} alt="logo" />
            </div>
            <div className={styles.information}>
              <div className={styles.upperInfo}>
                <p className={styles.postedAt}>{element.postedAt}</p>
                <div className={styles.dot} />
                <p className={styles.contract}>{element.contract}</p>
              </div>
              <p className={classNames(styles.position, styles[currentStyle])}>
                {element.position}
              </p>
              <p className={styles.company}>{element.company}</p>
              <p className={styles.location}>{element.location}</p>
            </div>
          </Link>
        ))}
        {loading && <CircularProgress />}
        {filter?.length === 0 && !loading && (

          <DialogError/>
        )}

      </div>        {next < filter?.length && (
          <button className={styles.button} onClick={handleMoreJob}>
            Load More
          </button>
        )}
    </div>
  );
};

export default JobsList;
