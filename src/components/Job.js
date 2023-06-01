import styles from "../scss/Job.module.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getJobs } from "../store/jobsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "./UI/Button";
import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";
import { useSpring, animated } from "react-spring";
import { useMediaQuery } from "react-responsive";

const Job = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jobsData = useSelector((state) => state.jobs.data);
  const currentStyle = useSelector((state) => state.theme.currentStyle);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const fadePage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const job = jobsData?.[id];
  return (
    <>
      <animated.div style={fadePage} className={styles.job}>
        <div className={classNames(styles.header, styles[currentStyle])}>
          {job ? (
            <>
              <div className={styles.logoname}>
                <div
                  style={{ backgroundColor: job.logoBackground }}
                  className={styles.logo}
                >
                  <img
                    className={styles.logoimg}
                    src={`${require(`../assets${job.logo}`)}`}
                    alt="logo"
                  />
                </div>
                <div className={styles.companyName}>
                  <p
                    className={classNames(styles.company, styles[currentStyle])}
                  >
                    {job.company}
                  </p>
                  <p className={styles.website}>{`${job.company
                    .toLowerCase()
                    .replaceAll(" ", "")}.com`}</p>
                </div>
                <Button name={"Company Site"} />
              </div>
            </>
          ) : (
            <div className={styles.progressWrapper}>
              <CircularProgress className={styles.progress} color="success" />
            </div>
          )}
        </div>
        {job ? (
          <div className={classNames(styles.main, styles[currentStyle])}>
            <div className={styles.infoButton}>
              <div className={styles.information}>
                <div className={styles.upperInfo}>
                  <p className={styles.postedAt}>{job.postedAt}</p>
                  <div className={styles.dot} />
                  <p className={styles.contract}>{job.contract}</p>
                </div>
                <p className={classNames(styles.where, styles[currentStyle])}>
                  {job.position}
                </p>
                <p className={styles.location}>{job.location}</p>
              </div>
              <Button name={"Apply now"} width={!isTablet ? "141px" : null} />
            </div>
            <p className={styles.description}>{job.description}</p>
            <h2 className={classNames(styles.jobTitle, styles[currentStyle])}>
              Requirements
            </h2>
            <p className={styles.description}>{job.requirements.content}</p>
            <ul className={styles.list}>
              {job.requirements.items.map((item, index) => (
                <li key={index} className={styles.require}>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className={classNames(styles.jobTitle, styles[currentStyle])}>
              What You Will Do
            </h2>
            <p className={styles.description}>{job.role.content}</p>
            <ol className={styles.orderedlist}>
              {job.role.items.map((item, index) => (
                <li key={index} className={styles.role}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <CircularProgress className={styles.progress} color="success" />
        )}
        {job ? (
          <div className={classNames(styles.footer, styles[currentStyle])}>
            <div className={styles.footerJobInfo}>
              <p className={classNames(styles.footerPosition, styles[currentStyle])}>{job.position}</p>
              <p className={styles.footerCompany}>{`${job.company
                .toLowerCase()
                .replaceAll(" ", "")}.com`}</p>
            </div>
            <div className={styles.footerbutton}>
              <Button name={"Apply now"} width={!isTablet ? "141px" : null} />
            </div>
          </div>
        ) : (
          <CircularProgress className={styles.progress} color="success" />
        )}
      </animated.div>
    </>
  );
};

export default Job;
