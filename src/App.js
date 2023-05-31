import styles from "./scss/App.module.scss"
import Header from "./components/Header";
import JobsList from "./components/JobsList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Job from "./components/Job";
import { useSelector } from "react-redux";
import classNames from "classnames";



function App() {
  const currentStyle = useSelector((state) => state.theme.currentStyle);
  return (
    <div className={classNames(styles.App, styles[currentStyle])}>
      <Header />
      <Routes>
      <Route exact path="/" element={<JobsList />} />
      <Route path="/job/:id" element={<Job/>} />
      </Routes>
    </div>
  );
}

export default App;
