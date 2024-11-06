import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import { Circle } from "rc-progress";
import img5 from "../assets/withdrawal.png";
import img4 from "../assets/recharge.png";
import diamond from "../assets/diamond-icon.png";
import "./Account.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import CountryCode from '../CountryCode/CountryCode'
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBar3 from "../NavigationBar3/NavigationBar3";
import { useTranslation } from 'react-i18next';


const Account = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // Simulating a function that checks user authentication and type
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");

    if (((user_type !== "client") && token)) {
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);



  const { t } = useTranslation()

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const firstName = localStorage.getItem("firstName");

  const [invite_code, setInvite_code] = useState(0);
  const [balance, setBalance] = useState(0);
  const [unsettle, setUnsettle] = useState(0);

  const [phone, setPhone] = useState(0);

  const progress = 33.3333;
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(user);
  const [amount, setAmount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("VIP1");
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user_id");
        const user_invitation_code = localStorage.getItem(
          "user_invitation_code"
        );

        const response = await axios.get(
          `${djangoHostname}/api/accounts/users/${user}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = response.data;

        setInvite_code(user_invitation_code);
        setBalance(data.balance);
        setUnsettle(data.unsettle);
        setPhone(data.phone);
        setLevel(data.level);
        setOrderCount(data.grabbed_orders_count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [djangoHostname]);

  useEffect(() => {
    // Load the Flutterwave script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleTopUpClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAmountClick = (amount) => {
    if (amount > 0) {
      setAmount(amount);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container-fluid dashboard-container">
      <div className=" pb-5 mb-5">
         <NavigationBar3 toggleSidebar={toggleSidebar}/>
      </div>
     
      <div className="row pb-5 mb-5">
        {/* Sidebar */}
        <div
          className={`col-lg-3 col-md-4 pl-4 sidebar ${
            sidebarOpen ? "open" : "" 
          }`}
        >
          <div className="profile-section text-center py-5">
          <label
  htmlFor="profile-pic-upload"
  className="profile-pic-label position-relative"
>
  <img
    src={profilePic}
    className="img-fluid profile-pic"
    alt="Profile"
  />
  <i className="bi bi-camera fs-3 text-light position-absolute start-50 end-0 bottom-100 top-0 me-5"></i>
</label>

<input
  type="file"
  id="profile-pic-upload"
  accept="image/*"
  style={{ display: "none" }}
  onChange={handleProfilePicChange}
/>
            <div className="profile-info px-5">
              <p>
                <strong>Number:</strong> {phone}
              </p>
              <p>
                <strong>Invitation Code:</strong> {invite_code}
              </p>
            </div>
          </div>
          <hr />
          <nav className="nav flex-column account-section fw-bold py-5">
      
            <li>
              <Link to={'/login'} className="nav-link" href="#">
                <i className="bi bi-box-arrow-right fs-3 my-2"></i> Log out
              </Link>
            </li>
          </nav>
        </div>

        <div className="col-lg-9 px-0">
          <div className="main-content pt-5 pb-5">
            <div className="d-flex justify-content-between ms-5 text-light pb-5">
              <div>
                <h2 className="fs-1 fw-bold">Hey {firstName},</h2>
                <p>Welcome! Ready to grab and get commission.</p>
              </div>
           
            </div>

            <div className=" text-center  rounded-5 w-75 balance-card mx-auto">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-4 col-sm-12 text-light">
                    <div className="text-start py-2 mt-1">
                      <img src={diamond} alt="Diamond" className="img-fluid" />
                    </div>
                    <h4 className="border border-3 py-2 text-light rounded-pill fs-5">
                    Account Balance
                    </h4>
                    <p className="fw-bold text-center display-2">KSh {balance}</p>
                  </div>
                  <div className="col-lg-1 mt-5 d-none d-lg-block">
                    <div className="vr h-100"></div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 text-light">
                    <h4 className="border border-3 py-1 text-light rounded-pill mt-5">
                    Unsettle
                    </h4>
                    <p className="fw-bold display-1 text-start text-center ">
                      KSh {unsettle}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 text-light">
                    <div className="100 mx-auto my-5">
                      <div className="rounded-circle rounded-pro position-relative p-3 bg-light">
                        <Circle
                          percent={progress}
                          strokeWidth={10}
                          strokeColor="#FFAD31"
                          strokeLinecap="square"
                          trailWidth={10}
                          trailColor="#EEE"
                          gapPosition="bottom"
                        />
                        <h2 className="vip-count position-absolute top-50 start-0 end-0 translate-middle-y display-5 w-75 mx-4 my-2 fw-bold text-center">
                          {level}
                        {/* {level}<br/> <span id="count">1</span> */}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-5 text-center mb-5">
              <div className="links">
                <div className="row justify-content-center pt-5 px-5 rounded-pill pb-5">
                  <div className="col-lg-4 col-md-6 col-sm-6 mb-3 mb-md-0">
                    <Link
                      to="/withdraw"
                      className="fw-bold border border-2 text-light action text-decoration-none px-3 py-3 rounded-pill d-block "
                    >
                      {/* <i className="bi bi-wallet2 fs-3"></i>  */}
                      <img src={img5} className="img-fluid mb-2" alt="" />{" "}
                      Quick Withdrawal
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <Link
                      onClick={handleTopUpClick}
                      className="fw-bold border action border-2 text-light text-decoration-none px-2 py-2 rounded-pill d-block"
                    >
                      {/* <i className="bi bi-cash-stack fs-3"></i>  */}
                      <img src={img4} className="img-fluid mb-3" alt="" />{" "}
                      Top Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="modal show  d-block" tabIndex="-3" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content top-up">
                  <div className="modal-header">
                    <h5 className="modal-title ms-auto">Top Up Account</h5>
                    <button
                      type="button"
                      className="close border-0 ms-auto fs-1 bg-transparent"
                      onClick={handleCloseModal}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body mx-auto">
                    <p>Select Recharge Amount...</p>
                    <hr />
                    <div className="container">
                      <div className="row gy-3">
                      {(level === "VIP1" || level === "VIP2") && (
                      <div className="col-lg-12 col-md-6 col-sm-12 d-flex recharge-btn">
                        <button
                          className="btn border w-100 fw-bold mx-2"
                          onClick={() => handleAmountClick(250)}
                          disabled={!(level === "VIP1" && orderCount == 0) }
                        >
                          KSh 250 
                        </button>
                        <button
                          disabled={!(level === "VIP2" && orderCount == 0)}
                          className="btn border fw-bold w-100 mx-2"
                          onClick={() => handleAmountClick(1200)}
                        >
                          KSh 1200
                        </button>
                      </div>
                    )}
                  
                        <div className="col-lg-12 col-md-6 col-sm-12 d-flex recharge-btn">
                          <button
                            disabled={!(level === "VIP2"  && orderCount == 1)}
                            className="btn border fw-bold w-100 mx-2"
                            onClick={() => handleAmountClick(500)}
                          >
                            KSh 500
                          </button>
                          <button
                            disabled={!(level === "VIP3" )}
                            className="btn border fw-bold w-100 mx-2"
                            onClick={() => handleAmountClick(2000)}
                          >
                            KSh 2000
                          </button>
                        
                        </div>
                        <div className="col-lg-12 col-md-6 col-sm-12 d-flex recharge-btn">
                          <button
                            //  disabled={!(level === "VIP3" && orderCount < 3)}
                            disabled={!(level === "VIP3" )}
                            className="btn border fw-bold w-100 mx-2"
                            onClick={() => handleAmountClick(7530)}
                          >
                            KSh 7530
                          </button>
                          <button
                            // disabled={!(level === "VIP3"  && orderCount < 4)}
                            disabled={!(level === "VIP3" )}
                            className="btn border fw-bold w-100 mx-2"
                            onClick={() => handleAmountClick(12500)}
                          >
                            KSh 12500
                          </button>
                        </div>

                        {level === "VIP3" && (
                          <>
                        <div className="col-lg-12 col-md-6 col-sm-12 d-flex recharge-btn">
                          <button
                            // disabled={!(level === "VIP3"  && orderCount < 5)}
                            className="btn border fw-bold w-100 mx-2"
                            onClick={() => handleAmountClick(20200)}
                          >
                            KSh 20200
                          </button>
                          
                          <button
                            // disabled={!(level === "VIP3"  && orderCount < 6)}
                            className="btn border fw-bold w-100 mx-2"
                            onClick={() => handleAmountClick(12700)}
                          >
                            KSh 12700
                          </button>
                        
                        </div>
                        <div className="col-lg-12 col-md-6 col-sm-12 d-flex recharge-btn">
                          <button
                            // disabled={!(level === "VIP3"  && orderCount < 7)}
                            className="btn border fw-bold w-100 mx-2"
                            onClick={() => handleAmountClick(35000)}
                          >
                            KSh 35000
                          </button>
                          <button
                            // disabled={!(level === "VIP3"  && orderCount < 8)}
                            className="btn border fw-bold w-100 mx-2"
                            onClick={() => handleAmountClick(37800)}
                          >
                            KSh 37800
                          </button>
                        </div>
                        
                            <div className="col-lg-12 col-md-6 col-sm-12 d-flex recharge-btn">
                              <button
                                // disabled={!(level === "VIP3"  && orderCount < 9)}
                                className="btn border fw-bold w-100 mx-2"
                                onClick={() => handleAmountClick(55700)}
                              >
                                KSh 55700
                              </button>
                              <button
                              //  disabled={!(level === "VIP3"  && orderCount < 10)}
                                className="btn border fw-bold w-100 mx-2"
                                onClick={() => handleAmountClick(43200)}
                              >
                                KSh 43200
                              </button>
                            </div>

                            <div className="col-lg-12 col-md-6 col-sm-12 d-flex recharge-btn">
                              <button
                                // disabled={!(level === "VIP3"  && orderCount < 11)}
                                className="btn border fw-bold w-100 mx-2"
                                onClick={() => handleAmountClick(63600)}
                              >
                                KSh 63600
                              </button>
                              <button
                                // disabled={!(level === "VIP3"  && orderCount < 12)}
                                className="btn border fw-bold w-100 mx-2"
                                onClick={() => handleAmountClick(85000)}
                              >
                                KSh 85000
                              </button>
                            </div>
                          
                          </>
                        )}
                          <div className="col-lg-12 col-md-12 col-sm-12 my-3">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Aamount"
                                value={amount}
                                onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value)))}
                                min="0"
                              />
                            </div>


                        <div className="mt-5">
                          {amount === 0 || loading ? (
                            <div className="recharge-disabled text-light fw-bold rounded-pill text-decoration-none w-75 border-0 py-2">
                              {loading ? "Processing..." : "Recharge now"}
                            </div>
                          ) : (
                            <Link
                              to={`/recharge-account?amount=${amount}`}
                              type="button"
                              className="recharge text-light fw-bold rounded-pill text-decoration-none w-75 border-0 py-2"
                            >
                              Recharge Now
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer mx-auto">
                    <button
                      type="button"
                      className="btn bg-transparent fw-bold fs-3"
                      onClick={handleCloseModal}
                    >
                      <span>&times;</span>
                    </button>
                    {/* <button type="button" className="btn btn-primary">
                      Save changes
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div> 
      <div>
      <NavigationBar />
      </div>
    </div>
  );
};

export default Account;
