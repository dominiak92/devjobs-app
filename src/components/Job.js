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
    window.scrollTo({top: 0});
  }, []);

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
                  <img src={`${require(`../assets${job.logo}`)}`} alt="logo" />
                </div>
                <div className={styles.companyName}>
                  <p className={classNames(styles.company, styles[currentStyle])}>{job.company}</p>
                  <p className={styles.website}>{`${job.company
                    .toLowerCase()
                    .replaceAll(" ", "")}.com`}</p>
                </div>
                <Button name={"Company Site"} />
              </div>
            </>
          ) : (
            <CircularProgress className={styles.progress} color="success" />
          )}
        </div>
        {job ? (
          <div className={classNames(styles.main, styles[currentStyle])}>
            <div className={styles.information}>
              <div className={styles.upperInfo}>
                <p className={styles.postedAt}>{job.postedAt}</p>
                <div className={styles.dot} />
                <p className={styles.contract}>{job.contract}</p>
              </div>
              <p className={classNames(styles.where, styles[currentStyle])}>{job.position}</p>
              <p className={styles.location}>{job.location}</p>
            </div>
            <Button name={"Apply now"} />
            <p className={styles.description}>{job.description}</p>
            <h2 className={classNames(styles.jobTitle, styles[currentStyle])}>Requirements</h2>
            <p className={styles.description}>{job.requirements.content}</p>
            <ul className={styles.list}>
              {job.requirements.items.map((item, index) => (
                <li key={index} className={styles.require}>
                  {item}
                </li>
              ))}
            </ul>
            <h2 className={classNames(styles.jobTitle, styles[currentStyle])}>What You Will Do</h2>
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
        <div className={classNames(styles.footer, styles[currentStyle])}>
          <div className={styles.footerbutton}>
            <Button name={"Apply now"} />
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Job;
