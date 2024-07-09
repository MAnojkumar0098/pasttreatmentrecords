import "./userform.css";
import Table from "./table.jsx";
import { useDebugValue, useState } from "react";
import LoadingSpinner from "./LoadingSpinner.js";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Skeleton, { SkeletonTheme } from "react-skeleton-loading";
import { motion } from "framer-motion";

function Userform() {
  let [inp, setInp] = useState([]);
  let [Loading, setLoading] = useState(false);
  let [hospital, setHospital] = useState("");
  let [b, setB] = useState("");
  let [div, setDiv] = useState();
  let [div1, setDiv1] = useState();
  let [year, setYear] = useState();
  let [ID, setID] = useState();
  const headingRef = useRef(null);
  const parent = {
    hover: {
      scale: [1.1, 1, 1.1, 1, 1.1, 1],
    },
    init: {
      y: -20,
    },
    ani: {
      y: 0,
      transition: {
        type: "spring",
        damping: 1,
        stiffness: 50,
        repeat: Infinity,
        repeatDelay: 0.2,
        repeatType: "reverse",
      },
    },
  };
  // useEffect(() => {
  //   // Animation using GSAP
  //   gsap.from(headingRef.current, {
  //     duration: 0.7,
  //     delay: 1,
  //     opacity: 0.2,
  //     y: 20,
  //     //x:100,
  //     ease: "power3.out",
  //     yoyo: true,
  //     repeat: -1,
  //   });
  // }, []);
  function fun(e) {
    if (!isNaN(e.target.value)) {
      setDiv(true);
    } else {
      setDiv(false);
    }
    if (e.target.value < 0) {
    }
  }
  function peri(e) {
    if (e.target.value < 0) {
      setDiv1(true);
    } else {
      setDiv1(false);
    }
  }
  function fnyear(e) {
    if (e.target.value > 2024 || e.target.value < 1900) {
      setYear(true);
    } else setYear(false);
  }
  function fnId(e) {
    if (e.target.value < 0) {
      setID(true);
    } else setID(false);
  }
  function setformval(e) {
    if (div || div1 || ID || year === "true") {
      alert("invalid credentials. Try Again");
      return;
    }
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    setInp((prev) => [...prev, data]);
    fetch("/submit", {
      method: "post",
      headers: {
        "Content-Type": "application/json", // Corrected content type
      },
      body: JSON.stringify(data), // Stringify the data for JSON
    })
      .then((res) => res.json())
      .then((dat) => console.log(dat))
      .catch((error) => console.error("Error:", error)); // Handle potential errors
    setTimeout(() => {
      setLoading(false); // Set loading back to false when the operation is complete
    }, 500); // Adjust the timeout as needed
  }
  function fn(e) {
    e.target.value === "others" ? setB(1) : setB("");
  }
  function placeset(e) {
    if (e.target.value === "hubli") setHospital("hubli");
    else if (e.target.value === "banglore") setHospital("banglore");
    else if (e.target.value === "belagum") setHospital("belagum");
    else if (e.target.value === "davangere") setHospital("davangere");
  }
  return (
    <div className="container">
      <div style={{ overflow: "hidden", margin: "0px", padding: "0px" }}>
        <motion.h1
          variants={parent}
          whileHover="hover"
          initial="init"
          animate="ani"
        >
          Past Treatment History
        </motion.h1>
      </div>
      <form name="myform" onSubmit={setformval}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="enter name"
            required
            onChange={fun}
          />
        </div>
        {div && (
          <div style={{ backgroundColor: "salmon" }}>
            name should not contain number
          </div>
        )}
        <div>
          <label>ID</label> :
          <input
            type="number"
            name="id"
            required
            onChange={fnId}
            placeholder="enter ID"
          />
          {ID && (
            <div style={{ backgroundColor: "salmon" }}>
              ID should be positive
            </div>
          )}
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            name="year"
            id="year"
            placeholder="Enter year"
            onChange={fnyear}
          />
          {year && (
            <div style={{ backgroundColor: "salmon" }}>Year is not valid</div>
          )}
        </div>
        <div>
          <label htmlFor="place">Place:</label>
          <select name="place" id="place" required onChange={placeset}>
            <option value="">--select--</option>
            <option value="hubli">Hubli</option>
            <option value="banglore">Bengaluru</option>
            <option value="belagum">Belgaum</option>
            <option value="davangere">Davangere</option>
          </select>
        </div>
        <div>
          <label htmlFor="center">Center:</label>
          {hospital === "hubli" ? (
            <>
              <select name="center" id="center" required>
                <option value="">--select--</option>
                <option value="KIMMS">KIMMS</option>
                <option value="SDM">SDM</option>
                <option value="sushruta">Sushruta hospital</option>
                <option value="Japriya">Japriya hospital</option>
                <option value="secure hospital">Secure hospital</option>{" "}
              </select>
            </>
          ) : (
            ""
          )}

          {hospital === "banglore" ? (
            <>
              <select name="center" id="center" required>
                <option value="">--select--</option>
                <option value="Patil">Patil hospital</option>
                <option value="Apollo">Apollo hospital</option>
                <option value="Manipal">Manipal</option>
                <option value="Fortis">Fortis hospital</option>
              </select>
            </>
          ) : (
            ""
          )}

          {hospital === "belagum" ? (
            <>
              <select name="center" id="center" required>
                <option value="">--select--</option>
                <option value="kle hospital">KLE hospital</option>
                <option value="city hospital">city hospital</option>
                <option value="city hospital">Lake view hospital</option>
                <option value="city hospital">Yash hospital</option>
              </select>
            </>
          ) : (
            ""
          )}

          {hospital === "davangere" ? (
            <>
              <select name="center" id="center" required>
                <option value="">--select--</option>
                <option value="kle hospital">Suryodha hospital</option>
                <option value="city hospital">Suchethana hospital</option>
                <option value="city hospital">Vijaya hospital</option>
                <option value="city hospital">Sri durga hospital</option>
              </select>
            </>
          ) : (
            ""
          )}
        </div>
        {div1 && (
          <div style={{ backgroundColor: "salmon" }}>
            period should be positive number
          </div>
        )}
        <div>
          <label htmlFor="tperiod">Treatment Period:</label>
          <div id="period">
            <input
              type="number"
              name="tperiod_value"
              id="tperiod"
              required
              onChange={peri}
            />
            <select name="tperiod_unit" id="unit">
              <option value="days">Days</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>
        <div></div>
        <div>
          <label htmlFor="reason">Reason:</label>
          <div id="period">
            <select name="reason" id="reason" required onChange={fn}>
              <option value="">--select--</option>
              <option>Family problems</option>
              <option>Friends</option>
              <option>Work-load</option>
              <option>Breakup</option>
              <option value="others">Others</option>
            </select>
            {b && (
              <input
                type="text"
                name="otherReason"
                id="otherReason"
                placeholder="Specify other reason"
              />
            )}
          </div>
        </div>
        <div></div>
        <button type="submit" className="button-71">
          ADD
        </button>
      </form>
      {Loading ? (
        <div>
          <SkeletonTheme
            baseColor="red"
            highlightColor="grey"
            className="styled-table"
          >
            <Skeleton height="200px" width="2000px" />
          </SkeletonTheme>
        </div>
      ) : (
        <Table data={inp} />
      )}
    </div>
  );
}

export default Userform;
