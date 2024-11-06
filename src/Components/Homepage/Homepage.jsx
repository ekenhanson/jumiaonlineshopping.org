import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import img1 from "../assets/slider11.png";
import img2 from "../assets/slider.jpg";
import img3 from "../assets/slider3.jpg";
import img4 from "../assets/recharge.png";
import img5 from "../assets/withdrawal.png";
import img6 from "../assets/invite.png";
import NavigationBar2 from "../NavigationBar2/NavigationBar2";
import NavigationBar from "../NavigationBar/NavigationBar";
import Usercomision from "../Usercomision/Usercomision";
import Partners from "../Partners/Partners";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Homepage = () => {

  const navigate = useNavigate();

 useEffect(() => {
    // Simulating a function that checks user authentication and type
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");

    if (((user_type !== "client") && token)) {
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  const pageText = document.body.innerText;
  console.log(pageText);

  const { t } = useTranslation()
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [invite_code, setInvite_code] = useState(0);
  const [balance, setBalance] = useState(0);
  const [unsettle, setUnsettle] = useState(0);

  const [phone, setPhone] = useState(0);
  const [profilePic, setProfilePic] = useState("");
  const [orderCount, setOrderCount] = useState(0);
  const [level, setLevel] = useState("VIP1");
  

  const [showModal, setShowModal] = useState(false);

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


  const handleTopUpClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAmountClick = (amount) => {
    setAmount(amount);
  };

  

  return (
    <div className="container pb-5">
      <NavigationBar2 />
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide rounded-5 my-5 py-5" data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src={img3} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={img2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={img1} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* card */}
      <div className="container-fluid my-5 py-4">
        <div className="container quick rounded-5 py-5 px-3">
          <div className="row gy-3 justify-content-center text-center">
          
            <div className="col-lg-4 col-md-4 col-sm-12">
              <Link
              onClick={handleTopUpClick}
              
                className="btn W-25 py-3 px-4 bg-transparent rounded-5 action"
              >
                <img src={img4} className="img-fluid mb-2" alt="" />{" "}
                <span className="fw-bold text-light">Top Up</span>
                {/* <span className="fw-bold text-light">{t('topup')}</span> */}
              </Link>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <Link
                to={"/withdraw"}
                className="btn py-3 px-4 bg-transparent rounded-5 action"
              >
                <img src={img5} className="img-fluid mb-2" alt="" />{" "}
                <span className="fw-bold text-light">Quick Withdrawal</span>
                {/* <span className="fw-bold text-light">{t('quick_withdrawal')}</span> */}
              </Link>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <Link
                to={""}
                className="btn W-25 py-2 px-4 bg-transparent rounded-5 action"
              >
                <img src={img6} className="img-fluid mb-2" alt="" />{" "}
                <span className="fw-bold text-light">Invite</span>
                {/* <span className="fw-bold text-light">{t('invite')}</span> */}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Usercomision />
        <Partners />
      </div>
      <div className="mt-5">
        <NavigationBar />
      </div>

      {showModal && (
            <div className="modal show  d-block" tabIndex="-3" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content top-up">
                  <div className="modal-header">
                    <h5 className="modal-title ms-auto">Top Up Account</h5>
                    {/* <h5 className="modal-title ms-auto">{t('top_up_account')}</h5> */}
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
                    {/* <p>{t('select_recharge_amount')}...</p> */}
                    <hr />
                    <div className="container">
                      <div className="row gy-3">
                      {(level === "VIP1" || level === "VIP2") && (
                      <div className="col-lg-12 col-md-6 col-sm-12 d-flex recharge-btn">
                        <button
                          className="btn border w-100 fw-bold mx-2"
                          onClick={() => handleAmountClick(250)}
                          // disabled={!(level === "VIP1" || balance == 40)}
                          disabled={!(level === "VIP1" && orderCount == 0)  }
                          // disabled={!(level === "VIP1" && orderCount == 0 || (level === "VIP2" && orderCount == 1))  }
                        >
                          KSh 250 
                        </button>
                        <button
                          // disabled={level !== "VIP2"}
                          disabled={!(level === "VIP2" && orderCount == 0) }
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
                                placeholder="Enter Amount"
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
  );
};

export default Homepage;

