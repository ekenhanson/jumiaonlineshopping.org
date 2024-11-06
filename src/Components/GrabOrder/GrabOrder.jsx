import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GrabOrder.css";
import diamond from "../assets/diamond-icon.png";
import data from "../assets/data-icon.png";
import semilogo from "../assets/walmart-semi-logo.png";
import logage from "../assets/logage.png";
import headphone from "../assets/headphone.png";
import smartwatch from "../assets/smartwatch.png";
import { Circle } from "rc-progress";
import Modal1 from "../Modal/Modal1";
import ModalTaskCompleted from "../ModalTaskCompleted/ModalTaskCompleted";
import ModalTaskForbidden from "../ModalTaskForbidden/ModalTaskForbidden";
import axios from "axios";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBar2 from "../NavigationBar2/NavigationBar2";
import { useTranslation } from "react-i18next";

const GrabOrder = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating a function that checks user authentication and type
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");

    if (user_type !== "client" && token) {
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  const { t } = useTranslation();

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const [balance, setBalance] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [user_level, setUserLevel] = useState("VIP1");
  const [progress, setProgress] = useState(0);
  const [commission1, setCommission1] = useState(0);
  const [commission2, setCommission2] = useState(0);

  const [messageF, setMessageF] = useState(false);
  const [showModalF, setShowModalF] = useState(false);
  const [showTaskCompletedModal, setShowTaskCompletedModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalTaskForbidden, setModalTaskForbidden] = useState(false);
  const [grabAttempts, setGrabAttempts] = useState(0);

  const images = [logage, headphone, smartwatch, semilogo];
  const [currentImage, setCurrentImage] = useState(diamond);
  const amount = 10;

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const handleGrabClick = () => {
    // if ((user_level === "VIP1" && orderCount === 0 && balance <= 10) || (user_level === "VIP2" && orderCount === 0 && balance <= 39)) {
    //   setMessageF("Forbidden, contact Administrator");
    //   setShowModalF(true);

    if (user_level === "VIP1" && orderCount === 0 && balance < 300){
        setMessageF("Forbidden, contact Administrator");
        // setMessageF(t("forbidden_contact_administrator"));
         setShowModalF(true);
      } 
      else if (user_level === "VIP2" && orderCount === 0 && balance < 1200) {
   
      setMessageF("Forbidden, contact Administrator");
     // setMessageF(t("forbidden_contact_administrator"));
      setShowModalF(true);
      
      }else if (user_level === "VIP2" && orderCount === 1 && balance < 500) {
   
      setMessageF("Top up KSh 500 to Continue Grabbing");
     // setMessageF(t("forbidden_contact_administrator"));
      setShowModalF(true);
      
    } else if (user_level === "VIP3" && orderCount === 0 && balance < 2000) {
      setMessageF("Forbidden Contact Administrator");
      // setMessageF(t("Top_up_$70"));
      //setMessageF(t("forbidden_contact_administrator"));


      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 1 && balance < 4850) {
      setMessageF("Top up KSh 4850 to start Grabbing");
      //setMessageF(t("Top_up_$120"));

      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 2 && balance < 7530) {
       setMessageF("Top up KSh 7530 to start Grabbing");
      //setMessageF(t("Top_up_$200"));z

      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 3 && balance < 12500) {
      setMessageF("Top up KSh 12500 to start Grabbing");
      //setMessageF(t("Top_up_$500"));

      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 4 && balance < 20200) {
      setMessageF("Top up KSh 20200 to start Grabbing");
      //setMessageF(t("Top_up_$900"));

      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 5 && balance < 12700) {
       setMessageF("Top up KSh 12700 to start Grabbing");
      //setMessageF(t("Top_up_$1200"));

      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 6 && balance < 35000) {
      setMessageF("Top up KSH 35000 to start Grabbing");
      //setMessageF(t("Top_up_$1500"));
      
      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 7 && balance < 37800) {
      setMessageF("Top up KSh 37800 to start Grabbing");
      //setMessageF(t("Top_up_$2200"));
      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 8 && balance < 55700) {
       setMessageF("Top up KSH 55700 to start Grabbing");
      //setMessageF(t("Top_up_$3000"));
      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 9 && balance < 43200) {
       setMessageF("Top up KSh 43200 to start Grabbing");
      //setMessageF(t("Top_up_$3500"));
      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 10 && balance < 63600) {
      setMessageF("Top up KSh 63600 to start Grabbing");
      //setMessageF(t("Top_up_$3950"));
      setShowModalF(true);
    } else if (user_level === "VIP3" && orderCount === 11 && balance < 85000) {
       setMessageF("Top up KSh 85000 to start Grabbing");
      //setMessageF(t("Top_up_$4200"));
      setShowModalF(true);
    } else if (grabAttempts < 3) {
      if (
        (user_level === "VIP1" && orderCount < 3) ||
        (user_level === "VIP2" && orderCount < 2) ||
        (user_level === "VIP3" && orderCount < 12)
      ) {
        setCurrentImage(getRandomImage());
        setShowModal(true);
        setGrabAttempts((prev) => prev + 1);
      } else {
        setShowTaskCompletedModal(true);
      }
    } else {
      setShowTaskCompletedModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleTaskCompletedClose = () => {
    setShowTaskCompletedModal(false);
  };
  const handleTaskForbiddenClose = () => {
    // window.location.reload()
    setShowModalF(false); // This will hide the modal
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user_id");

        const response = await axios.get(
          `${djangoHostname}/api/accounts/users/${user}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = response.data;

        setCommission1(data.commission1);
        setCommission2(data.commission2);
        setUserLevel(data.level);
        setBalance(data.balance);
        setOrderCount(data.grabbed_orders_count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [djangoHostname]);

  return (
    <div className="pb-5 mb-5 pt-5">
      <NavigationBar2 />
      <div className="container py-5">
        <h1 className="text-center fw-bold my-5">Order</h1>
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6 col-md-12 col-sm-12 mt-5">
            <div className="card parent-card rounded-5 p-4 border-0">
              <div className="child-card py-3 px-5 border-0 mx-auto text-light rounded-5">
              <div className="text-start">
                  <img
                    src={semilogo}
                    alt="semi-logo"
                    className="img-fluid w-25"
                  />
                </div>
                <p className="text-light h4 text-end">
                  Current Balance <i className="bi bi-chevron-right"></i>
                </p>
                <div>
                  <p className="current-balance fw-bold fs-2">
                  KSh <span className="display-1 fw-bold">{balance}</span>
                  </p>
                </div>
                {/* <div className="text-end">
                  <img
                    src={semilogo}
                    alt="semi-logo"
                    className="img-fluid w-25"
                  />
                </div> */}
              </div>
              <hr className="w-75 mx-auto my-5" />
              <div className="fw-bold fs-4 d-flex justify-content-between px-4">
                <div>
                  <img src={data} alt="data-icon" className="img-fluid" />
                </div>
                <p>Yesterday Commision</p>
              </div>
              <div className="px-4">
                <p className="commission fw-bold fs-1">KSh {commission1}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="card parent-card h-50 border-0 rounded-5">
              <div className="card parent-card rounded-5 p-4 border-0">
                <div className="w-50 mx-auto ">
                  <div className="rounded-circle position-relative w-100 p-1 bg-light">
                    <Circle
                      percent={progress}
                      strokeWidth={10}
                      strokeColor="#FFAD31"
                      strokeLinecap="square"
                      trailWidth={10}
                      trailColor="#EEE"
                      gapPosition="bottom"
                    />
                    <h2 className="order-count position-absolute top-50 start-0 end-0 translate-middle-y display-4 w-75 mx-4 my-3 fw-bold text-center">
                      Order <span id="count">{orderCount}</span>
                    </h2>
                  </div>
                </div>
                <hr className="w-75 mx-auto my-5" />
                <div className="fw-bold fs-4 d-flex justify-content-between px-4">
                  <div>
                    <img src={data} alt="data-icon" className="img-fluid" />
                  </div>
                  <p>Today Commision</p>
                </div>
                <div className="px-4">
                  <p className="commission fw-bold fs-1">KSh {commission2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn w-75 py-3 fw-bold rounded-pill fs-2 grab text-light"
            onClick={handleGrabClick}
          >
            Start Grabing
          </button>
        </div>
      </div>
      <ModalTaskForbidden
        showF={showModalF}
        handleCloseF={handleTaskForbiddenClose}
        messageF={messageF}
      />
      <Modal1
        show={showModal}
        handleClose={handleClose}
        user_level={user_level}
        amount={amount}
        balance={Number(balance)}
        orderCounts={orderCount}
      />
      <ModalTaskCompleted
        show={showTaskCompletedModal}
        handleClose={handleTaskCompletedClose}
      />

      <NavigationBar />
    </div>
  );
};

export default GrabOrder;


// iPad Air
// iPad Pro
// Surface Pro 7
// Asus Zenbook Fold